import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAdminCredentials, fetchAllAccounts, signup, updateAccountFields, deleteAccount, updateAccountSnapshot, fetchAccount } from '../lib/auth'
import { buildSnapshot, formatMoney, getPaymentStatus, setPaymentStatus, recomputeIncomeExpenses } from '../lib/utils'
import type { AccountRow, AccountSnapshot } from '../lib/types'
import DarkModeToggle from '../components/DarkModeToggle'

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (isAdminCredentials(username, password)) {
      setLoggedIn(true)
    } else {
      setError('Invalid admin credentials')
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 relative">
        <div className="fixed top-4 right-4 z-50"><DarkModeToggle /></div>
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 mb-3">
              <i className="fas fa-shield-halved text-2xl text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Verification</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Restricted access — authorized personnel only</p>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle" /> {error}
            </div>
          )}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Username</label>
                <div className="input-wrapper group">
                  <div className="relative">
                    <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10"><i className="fas fa-user text-sm" /></div>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required
                      className="w-full pl-10 pr-3 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all" placeholder="Admin username" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
                <div className="input-wrapper group">
                  <div className="relative">
                    <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10"><i className="fas fa-lock text-sm" /></div>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                      className="w-full pl-10 pr-3 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all" placeholder="Admin password" />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg transition-all text-sm">
                <i className="fas fa-sign-in-alt mr-2" /> Access Admin Panel
              </button>
              <Link to="/" className="block text-center text-xs text-gray-500 hover:text-primary-500">Back to home</Link>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard onLogout={() => { setLoggedIn(false); navigate('/') }} />
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [accounts, setAccounts] = useState<AccountRow[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string>('overview')
  const [toast, setToast] = useState('')

  const refresh = async () => {
    setLoading(true)
    setAccounts(await fetchAllAccounts())
    setLoading(false)
  }

  useEffect(() => { refresh() }, [])

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white">
            <i className="fas fa-shield-halved" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">Admin Panel</p>
            <p className="text-xs text-gray-500">Hapex Banking</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <button onClick={onLogout} className="px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-all">
            <i className="fas fa-sign-out-alt mr-1" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Section nav */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'overview', label: 'Overview', icon: 'fa-th-large' },
            { key: 'create', label: 'Create User', icon: 'fa-user-plus' },
            { key: 'balance', label: 'Adjust Balance', icon: 'fa-balance-scale' },
            { key: 'withdrawal', label: 'Edit Withdrawal Fee', icon: 'fa-money-bill-wave' },
            { key: 'cardfee', label: 'Edit Card Fee', icon: 'fa-credit-card' },
            { key: 'verify', label: 'Fee Verification', icon: 'fa-check-circle' },
            { key: 'regenerate', label: 'Regenerate History', icon: 'fa-history' },
            { key: 'delete', label: 'Delete User', icon: 'fa-trash' },
          ].map(s => (
            <button key={s.key} onClick={() => setActiveSection(s.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${activeSection === s.key
                ? 'bg-primary-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
              <i className={`fas ${s.icon}`} /> {s.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400"><i className="fas fa-spinner fa-spin text-2xl" /></div>
        ) : (
          <>
            {activeSection === 'overview' && <OverviewSection accounts={accounts} />}
            {activeSection === 'create' && <CreateUserSection onDone={refresh} showToast={showToast} />}
            {activeSection === 'balance' && <BalanceSection accounts={accounts} onDone={refresh} showToast={showToast} />}
            {activeSection === 'withdrawal' && <WithdrawalFeeSection accounts={accounts} onDone={refresh} showToast={showToast} />}
            {activeSection === 'cardfee' && <CardFeeSection accounts={accounts} onDone={refresh} showToast={showToast} />}
            {activeSection === 'verify' && <VerifySection accounts={accounts} onDone={refresh} showToast={showToast} />}
            {activeSection === 'regenerate' && <RegenerateSection accounts={accounts} onDone={refresh} showToast={showToast} />}
            {activeSection === 'delete' && <DeleteSection accounts={accounts} onDone={refresh} showToast={showToast} />}
          </>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-xl bg-green-600 text-white shadow-2xl flex items-center gap-2">
          <i className="fas fa-check-circle" /> {toast}
        </div>
      )}
    </div>
  )
}

function OverviewSection({ accounts }: { accounts: AccountRow[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Total Users', value: accounts.length, icon: 'fa-users', color: 'from-primary-500 to-primary-700' },
        { label: 'Total Balance', value: accounts.reduce((s, a) => s + Number(a.balance), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), icon: 'fa-wallet', color: 'from-green-500 to-green-700' },
        { label: 'Pending Fees', value: accounts.filter(a => Number(a.withdrawal_fee) > 0).length, icon: 'fa-money-bill-wave', color: 'from-yellow-500 to-yellow-700' },
        { label: 'Currencies', value: new Set(accounts.map(a => a.currency)).size, icon: 'fa-coins', color: 'from-purple-500 to-purple-700' },
      ].map(s => (
        <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-3`}>
            <i className={`fas ${s.icon}`} />
          </div>
          <p className="text-xs text-gray-500">{s.label}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{s.value}</p>
        </div>
      ))}
    </div>
  )
}

function CreateUserSection({ onDone, showToast }: { onDone: () => void; showToast: (m: string) => void }) {
  const [form, setForm] = useState({ name: '', password: '', email: '', phone: '', currency: 'USD', balance: '0', withdrawalFee: '0' })
  const [creating, setCreating] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    try {
      const userId = form.name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000)
      await signup({
        userId, name: form.name, email: form.email, phone: form.phone, password: form.password,
        currency: form.currency, balance: parseFloat(form.balance), withdrawalFee: parseFloat(form.withdrawalFee),
      })
      showToast(`User ${form.name} created successfully`)
      setForm({ name: '', password: '', email: '', phone: '', currency: 'USD', balance: '0', withdrawalFee: '0' })
      onDone()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to create user')
    }
    setCreating(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Create New User</h2>
      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'name', label: 'Full Name', type: 'text' },
          { key: 'password', label: 'Password', type: 'text' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'phone', label: 'Phone', type: 'tel' },
        ].map(f => (
          <div key={f.key} className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{f.label}</label>
            <input type={f.type} value={form[f.key as keyof typeof form]} onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))} required
              className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm transition-all" />
          </div>
        ))}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Currency</label>
          <select value={form.currency} onChange={e => setForm(s => ({ ...s, currency: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm">
            <option>USD</option><option>EUR</option><option>GBP</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Initial Balance</label>
          <input type="number" value={form.balance} onChange={e => setForm(s => ({ ...s, balance: e.target.value }))} step="0.01"
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm transition-all" />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Withdrawal Fee (0 = no gate)</label>
          <input type="number" value={form.withdrawalFee} onChange={e => setForm(s => ({ ...s, withdrawalFee: e.target.value }))} step="0.01"
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm transition-all" />
        </div>
        <button type="submit" disabled={creating} className="md:col-span-2 py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg transition-all text-sm disabled:opacity-50">
          {creating ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  )
}

function BalanceSection({ accounts, onDone, showToast }: { accounts: AccountRow[]; onDone: () => void; showToast: (m: string) => void }) {
  const [userId, setUserId] = useState('')
  const [amount, setAmount] = useState('')

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(amount)
    if (!userId || isNaN(amt)) return
    const row = accounts.find(a => a.user_id === userId)
    if (!row) return
    const snap = await fetchAccount(userId)
    if (!snap) return
    const newBalance = snap.balance + amt
    const tx = { id: crypto.randomUUID(), label: amt > 0 ? 'Admin Credit' : 'Admin Debit', amount: Math.abs(amt), date: new Date().toISOString(), category: 'Admin Adjustment', type: amt > 0 ? 'credit' as const : 'debit' as const }
    const updatedSnap = recomputeIncomeExpenses({ ...snap, balance: newBalance, transactions: [tx, ...snap.transactions] })
    await updateAccountSnapshot(userId, updatedSnap)
    showToast(`Balance adjusted by ${amt > 0 ? '+' : ''}${amt} for ${row.name}`)
    setAmount('')
    onDone()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Adjust User Balance</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Select User</label>
          <select value={userId} onChange={e => setUserId(e.target.value)} required
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm">
            <option value="">Select a user...</option>
            {accounts.map(a => <option key={a.user_id} value={a.user_id}>{a.name} ({a.user_id}) — {formatMoney(Number(a.balance), a.currency)}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Amount (negative to subtract)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required step="0.01"
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm transition-all" placeholder="100 or -50" />
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg transition-all text-sm">
          Update Balance
        </button>
      </form>
    </div>
  )
}

function WithdrawalFeeSection({ accounts, onDone, showToast }: { accounts: AccountRow[]; onDone: () => void; showToast: (m: string) => void }) {
  const [userId, setUserId] = useState('')
  const [fee, setFee] = useState('')

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const f = parseFloat(fee)
    if (!userId || isNaN(f)) return
    await updateAccountFields(userId, { withdrawal_fee: f })
    showToast(`Withdrawal fee updated to ${f} for ${accounts.find(a => a.user_id === userId)?.name}`)
    setFee('')
    onDone()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Edit Withdrawal Fee</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Select User</label>
          <select value={userId} onChange={e => setUserId(e.target.value)} required
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm">
            <option value="">Select a user...</option>
            {accounts.map(a => <option key={a.user_id} value={a.user_id}>{a.name} ({a.user_id}) — Current: {formatMoney(Number(a.withdrawal_fee), a.currency)}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">New Withdrawal Fee</label>
          <input type="number" value={fee} onChange={e => setFee(e.target.value)} required step="0.01"
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm transition-all" placeholder="0 = no gate" />
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg transition-all text-sm">
          Update Fee
        </button>
      </form>
    </div>
  )
}

function CardFeeSection({ accounts, onDone, showToast }: { accounts: AccountRow[]; onDone: () => void; showToast: (m: string) => void }) {
  const [userId, setUserId] = useState('')
  const [fee, setFee] = useState('')

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const f = parseFloat(fee)
    if (!userId || isNaN(f)) return
    const snap = await fetchAccount(userId)
    if (!snap) return
    await updateAccountSnapshot(userId, { ...snap, cardFee: f })
    showToast(`Card fee updated to ${f} for ${accounts.find(a => a.user_id === userId)?.name}`)
    setFee('')
    onDone()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Edit Card Fee</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Select User</label>
          <select value={userId} onChange={e => setUserId(e.target.value)} required
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm">
            <option value="">Select a user...</option>
            {accounts.map(a => <option key={a.user_id} value={a.user_id}>{a.name} ({a.user_id})</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">New Card Fee</label>
          <input type="number" value={fee} onChange={e => setFee(e.target.value)} required step="0.01"
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm transition-all" placeholder="0 = no fee" />
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg transition-all text-sm">
          Update Card Fee
        </button>
      </form>
    </div>
  )
}

function VerifySection({ accounts, onDone, showToast }: { accounts: AccountRow[]; onDone: () => void; showToast: (m: string) => void }) {
  const feeUsers = accounts.filter(a => Number(a.withdrawal_fee) > 0)

  const handleApprove = async (userId: string) => {
    setPaymentStatus(userId, 'approved')
    await updateAccountFields(userId, { payment_status: 'approved' })
    showToast(`Payment approved for ${accounts.find(a => a.user_id === userId)?.name} — features unlocked`)
    onDone()
  }

  const handleReject = async (userId: string) => {
    setPaymentStatus(userId, 'rejected')
    await updateAccountFields(userId, { payment_status: 'rejected' })
    showToast(`Payment rejected for ${accounts.find(a => a.user_id === userId)?.name}`)
    onDone()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Withdrawal Fee Verification</h2>
      {feeUsers.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No users with withdrawal fees</p>
      ) : (
        <div className="space-y-3">
          {feeUsers.map(a => {
            const status = getPaymentStatus(a.user_id)
            return (
              <div key={a.user_id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-700/50">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{a.name}</p>
                  <p className="text-xs text-gray-500">{a.user_id} • Fee: {formatMoney(Number(a.withdrawal_fee), a.currency)}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                    status === 'claimed' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                    status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>{status || 'pending'}</span>
                </div>
                {status !== 'approved' && status !== 'rejected' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(a.user_id)} className="px-3 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition-all">
                      <i className="fas fa-check mr-1" /> Payment Made
                    </button>
                    <button onClick={() => handleReject(a.user_id)} className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all">
                      <i className="fas fa-times mr-1" /> Not Made
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function RegenerateSection({ accounts, onDone, showToast }: { accounts: AccountRow[]; onDone: () => void; showToast: (m: string) => void }) {
  const [userId, setUserId] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [preview, setPreview] = useState<{ before: AccountSnapshot | null; after: AccountSnapshot | null } | null>(null)

  const handlePreview = async () => {
    if (!userId) return
    const before = await fetchAccount(userId)
    if (!before) return
    if (!before) return
    const after: AccountSnapshot = {
      ...before,
      transactions: [{ id: crypto.randomUUID(), label: 'Balance Reconciliation', amount: before.balance, date: new Date().toISOString(), category: 'Reconciliation', type: 'credit' }],
      income: before.balance > 0 ? before.balance : 0,
      expenses: 0,
    }
    setPreview({ before, after })
    setConfirming(true)
  }

  const handleRegenerate = async () => {
    if (!userId || !preview || !preview.after) return
    await updateAccountSnapshot(userId, preview.after)
    showToast(`Transaction history regenerated for ${accounts.find(a => a.user_id === userId)?.name}`)
    setConfirming(false)
    setPreview(null)
    setUserId('')
    onDone()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Regenerate Transaction History</h2>
      <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-xs flex items-start gap-2">
        <i className="fas fa-exclamation-triangle mt-0.5" /> This will permanently delete all transactions and replace them with a single reconciliation entry matching the current balance.
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Select User</label>
          <select value={userId} onChange={e => { setUserId(e.target.value); setPreview(null) }} required
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm">
            <option value="">Select a user...</option>
            {accounts.map(a => <option key={a.user_id} value={a.user_id}>{a.name} ({a.user_id})</option>)}
          </select>
        </div>
        {userId && !confirming && (
          <button onClick={handlePreview} className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-all text-sm">
            Preview Regeneration
          </button>
        )}
        {confirming && preview && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-700/50">
                <p className="text-xs font-semibold text-gray-500 mb-2">Before</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Transactions: {preview.before?.transactions.length || 0}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Income: {formatMoney(preview.before?.income || 0, preview.before?.currency || 'USD')}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Expenses: {formatMoney(preview.before?.expenses || 0, preview.before?.currency || 'USD')}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50">
                <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">After</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Transactions: 1</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Income: {formatMoney(preview.after?.income || 0, preview.after?.currency || 'USD')}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Expenses: {formatMoney(preview.after?.expenses || 0, preview.after?.currency || 'USD')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleRegenerate} className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-all text-sm">
                Confirm & Regenerate
              </button>
              <button onClick={() => { setConfirming(false); setPreview(null) }} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all text-sm">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function DeleteSection({ accounts, onDone, showToast }: { accounts: AccountRow[]; onDone: () => void; showToast: (m: string) => void }) {
  const [userId, setUserId] = useState('')
  const [confirming, setConfirming] = useState(false)

  const handleDelete = async () => {
    if (!userId) return
    await deleteAccount(userId)
    showToast(`User ${accounts.find(a => a.user_id === userId)?.name} deleted`)
    setConfirming(false)
    setUserId('')
    onDone()
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Delete User</h2>
      <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-xs flex items-start gap-2">
        <i className="fas fa-exclamation-triangle mt-0.5" /> This action is permanent and cannot be undone. All user data will be lost.
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Select User</label>
          <select value={userId} onChange={e => setUserId(e.target.value)} required
            className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm">
            <option value="">Select a user...</option>
            {accounts.map(a => <option key={a.user_id} value={a.user_id}>{a.name} ({a.user_id})</option>)}
          </select>
        </div>
        {userId && !confirming && (
          <button onClick={() => setConfirming(true)} className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-all text-sm">
            Delete User
          </button>
        )}
        {confirming && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
            <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-3">Are you sure you want to delete {accounts.find(a => a.user_id === userId)?.name}?</p>
            <div className="flex gap-2">
              <button onClick={handleDelete} className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all text-sm">
                Yes, Delete
              </button>
              <button onClick={() => { setConfirming(false); setUserId('') }} className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all text-sm">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
