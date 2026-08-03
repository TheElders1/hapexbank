import { supabase } from './supabase'
import type { AccountRow, AccountSnapshot } from './types'
import { extractSnapshot, buildSnapshot } from './utils'

const SESSION_KEY = 'hapex_user'
const ADMIN_USERNAME = 'TheElders1'
const ADMIN_PASSWORD = 'samdanbas1234'

export function getSession(): AccountSnapshot | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) as AccountSnapshot : null
  } catch {
    return null
  }
}

export function setSession(snap: AccountSnapshot) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(snap))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function isAdminUser(snap: AccountSnapshot): boolean {
  return snap.displayName === 'Sandra Bullock'
}

export function isAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function login(userId: string, password: string): Promise<AccountSnapshot | null> {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (error || !data) return null
  const row = data as AccountRow
  if (row.password !== password) return null

  const snap = extractSnapshot(row)
  setSession(snap)
  return snap
}

export async function signup(params: {
  userId: string
  name: string
  email: string
  phone: string
  password: string
  currency?: string
  balance?: number
  withdrawalFee?: number
}): Promise<AccountSnapshot> {
  const currency = params.currency || 'USD'
  const balance = params.balance ?? 0
  const withdrawalFee = params.withdrawalFee ?? 0

  const snap = buildSnapshot({
    userId: params.userId,
    displayName: params.name,
    email: params.email,
    phone: params.phone,
    currency,
    balance,
    withdrawalFee,
    cardFee: 0,
    password: params.password,
  })

  const { error } = await supabase.from('accounts').insert({
    user_id: params.userId,
    password: params.password,
    name: params.name,
    email: params.email,
    currency,
    balance,
    withdrawal_fee: withdrawalFee,
    card_fee: 0,
    payment_status: 'none',
    transactions: { __account: snap },
  })

  if (error) throw new Error(error.message)

  setSession(snap)
  return snap
}

export async function fetchAccount(userId: string): Promise<AccountSnapshot | null> {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()
  if (error || !data) return null
  return extractSnapshot(data as AccountRow)
}

export async function updateAccountSnapshot(userId: string, snap: AccountSnapshot) {
  const { error } = await supabase
    .from('accounts')
    .update({
    transactions: { __account: snap },
    balance: snap.balance,
    withdrawal_fee: snap.withdrawalFee,
    card_fee: snap.cardFee,
    payment_status: snap.withdrawalFee > 0 ? 'pending' : 'none',
    })
    .eq('user_id', userId)
  if (error) throw new Error(error.message)
}

export async function updateAccountFields(userId: string, fields: Record<string, unknown>) {
  const { error } = await supabase
    .from('accounts')
    .update(fields)
    .eq('user_id', userId)
  if (error) throw new Error(error.message)
}

export async function fetchAllAccounts(): Promise<AccountRow[]> {
  const { data, error } = await supabase.from('accounts').select('*')
  if (error || !data) return []
  return data as AccountRow[]
}

export async function deleteAccount(userId: string) {
  const { error } = await supabase.from('accounts').delete().eq('user_id', userId)
  if (error) throw new Error(error.message)
}
