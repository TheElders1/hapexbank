import type { AccountSnapshot, AccountRow, Card, Transaction, CardDesign } from './types'

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
}

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || '$'
}

export function formatMoney(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency)
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${amount < 0 ? '-' : ''}${symbol}${formatted}`
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function generateCardNumber(): string {
  const groups: string[] = []
  for (let g = 0; g < 4; g++) {
    let group = ''
    for (let i = 0; i < 4; i++) {
      group += Math.floor(Math.random() * 10).toString()
    }
    groups.push(group)
  }
  return groups.join(' ')
}

export function generateCVV(): string {
  return Math.floor(100 + Math.random() * 900).toString()
}

export function getTierForCurrency(currency: string): string {
  switch (currency) {
    case 'EUR': return 'Platinum'
    case 'GBP': return 'Gold'
    default: return 'Silver'
  }
}

export function getCardColor(currency: string): string {
  switch (currency) {
    case 'EUR': return 'from-slate-700 via-slate-800 to-slate-900'
    case 'GBP': return 'from-amber-500 via-amber-600 to-amber-700'
    default: return 'from-primary-600 via-primary-700 to-primary-800'
  }
}

export function createDefaultCards(currency: string, balance: number): Card[] {
  const cardNumber = generateCardNumber()
  const design: CardDesign = currency === 'EUR' ? 'black' : currency === 'GBP' ? 'gold' : 'blue'
  return [
    {
      id: crypto.randomUUID(),
      name: `Hapex ${getTierForCurrency(currency)}`,
      number: cardNumber.slice(0, 4) + ' •••• •••• ' + cardNumber.slice(-4),
      fullNumber: cardNumber,
      expiry: '12/29',
      cvv: generateCVV(),
      balance,
      limit: currency === 'EUR' ? 50000 : currency === 'GBP' ? 30000 : 25000,
      type: 'debit',
      frozen: false,
      color: getCardColor(currency),
      design,
    },
  ]
}

export function createDefaultContacts(): { name: string; initials: string; lastSent: string }[] {
  return [
    { name: 'Sarah Chen', initials: 'SC', lastSent: '2 days ago' },
    { name: 'Marcus Webb', initials: 'MW', lastSent: '1 week ago' },
    { name: 'Elena Rossi', initials: 'ER', lastSent: '3 days ago' },
    { name: 'James Park', initials: 'JP', lastSent: '5 days ago' },
  ]
}

export function buildSnapshot(params: {
  userId: string
  displayName: string
  email: string
  phone: string
  currency: string
  balance: number
  withdrawalFee: number
  cardFee: number
  password: string
}): AccountSnapshot {
  const symbol = getCurrencySymbol(params.currency)
  const initials = getInitials(params.displayName)
  return {
    userId: params.userId,
    displayName: params.displayName,
    initials,
    email: params.email,
    phone: params.phone,
    balance: params.balance,
    income: params.balance > 0 ? params.balance : 0,
    expenses: 0,
    incomeChange: 0,
    currency: params.currency,
    currencySymbol: symbol,
    withdrawalFee: params.withdrawalFee,
    cardFee: params.cardFee,
    password: params.password,
    transactions: params.balance > 0
      ? [{
          id: crypto.randomUUID(),
          label: 'Initial Deposit',
          amount: params.balance,
          date: new Date().toISOString(),
          category: 'Deposit',
          type: 'credit',
        }]
      : [],
    spendingCategories: [],
    cards: createDefaultCards(params.currency, params.balance),
    quickContacts: createDefaultContacts(),
    recentTransfers: [],
  }
}

export function extractSnapshot(row: AccountRow): AccountSnapshot {
  const raw = row.transactions as Record<string, unknown>
  const acct = (raw?.['__account'] as AccountSnapshot) || null
  if (acct) return acct
  return buildSnapshot({
    userId: row.user_id,
    displayName: row.name,
    email: row.email || '',
    phone: '',
    currency: row.currency,
    balance: Number(row.balance),
    withdrawalFee: Number(row.withdrawal_fee),
    cardFee: Number(row.card_fee || 0),
    password: row.password,
  })
}

export function recomputeIncomeExpenses(snap: AccountSnapshot): AccountSnapshot {
  let income = 0
  let expenses = 0
  for (const tx of snap.transactions) {
    if (tx.type === 'credit') income += tx.amount
    else expenses += tx.amount
  }
  return { ...snap, income, expenses }
}

export function getPaymentStatuses(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem('hapex_payment_statuses') || '{}')
  } catch {
    return {}
  }
}

export function setPaymentStatus(userId: string, status: string) {
  const all = getPaymentStatuses()
  all[userId] = status
  localStorage.setItem('hapex_payment_statuses', JSON.stringify(all))
}

export function getPaymentStatus(userId: string): string {
  const all = getPaymentStatuses()
  return all[userId] || 'none'
}
