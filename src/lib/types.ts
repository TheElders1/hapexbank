export interface Transaction {
  id: string
  label: string
  amount: number
  date: string
  category: string
  type: 'credit' | 'debit'
}

export type CardDesign = 'black' | 'red' | 'gold' | 'blue'

export interface Card {
  id: string
  name: string
  number: string
  fullNumber: string
  expiry: string
  cvv: string
  balance: number
  limit: number
  type: 'debit' | 'credit'
  frozen: boolean
  color: string
  design?: CardDesign
  cardholderName?: string
}

export interface QuickContact {
  name: string
  initials: string
  lastSent: string
}

export interface RecentTransfer {
  id: string
  to: string
  amount: number
  date: string
  status: string
}

export interface SpendingCategory {
  label: string
  amount: number
  pct: number
  color: string
}

export interface AccountSnapshot {
  userId: string
  displayName: string
  initials: string
  email: string
  phone: string
  balance: number
  income: number
  expenses: number
  incomeChange: number
  currency: string
  currencySymbol: string
  withdrawalFee: number
  cardFee: number
  password: string
  transactions: Transaction[]
  spendingCategories: SpendingCategory[]
  cards: Card[]
  quickContacts: QuickContact[]
  recentTransfers: RecentTransfer[]
}

export interface AccountRow {
  user_id: string
  password: string
  name: string
  email: string | null
  currency: string
  balance: number
  withdrawal_fee: number
  card_fee: number
  payment_status: string
  transactions: Record<string, unknown>
  created_at: string
}

export type PaymentStatus = 'none' | 'pending' | 'claimed' | 'approved' | 'rejected'
