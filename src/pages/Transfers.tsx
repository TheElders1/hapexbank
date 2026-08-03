import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { getSession, updateAccountSnapshot } from '../lib/auth'
import { formatMoney } from '../lib/utils'
import type { AccountSnapshot, RecentTransfer } from '../lib/types'
import WithdrawalFeeGate from '../components/WithdrawalFeeGate'

export default function Transfers() {
  const [snap, setSnap] = useState<AccountSnapshot | null>(getSession())
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [success, setSuccess] = useState(false)

  if (!snap) return null

  const isLocked = snap.withdrawalFee > 0 &&
    JSON.parse(localStorage.getItem('hapex_payment_statuses') || '{}')[snap.userId] !== 'approved'

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!snap || isLocked) return
    const amt = parseFloat(amount)
    if (isNaN(amt) || amt <= 0) return

    const transfer: RecentTransfer = {
      id: crypto.randomUUID(),
      to: recipient,
      amount: amt,
      date: new Date().toISOString(),
      status: 'Completed',
    }
    const tx = {
      id: crypto.randomUUID(),
      label: `Transfer to ${recipient}`,
      amount: amt,
      date: new Date().toISOString(),
      category: 'Transfer',
      type: 'debit' as const,
    }
    const updatedSnap: AccountSnapshot = {
      ...snap,
      balance: snap.balance - amt,
      expenses: snap.expenses + amt,
      transactions: [tx, ...snap.transactions],
      recentTransfers: [transfer, ...snap.recentTransfers],
    }
    setSnap(updatedSnap)
    await updateAccountSnapshot(snap.userId, updatedSnap)
    setRecipient('')
    setAmount('')
    setNote('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transfers</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Send money to anyone, instantly</p>
      </div>

      <WithdrawalFeeGate snap={snap} onUnlock={() => setSnap({ ...snap })} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transfer form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">New Transfer</h2>
          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
              <i className="fas fa-check-circle" /> Transfer sent successfully!
            </div>
          )}
          <form onSubmit={handleTransfer} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Recipient</label>
              <div className="input-wrapper group">
                <div className="relative">
                  <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10"><i className="fas fa-user text-sm" /></div>
                  <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} required disabled={!!isLocked}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all disabled:opacity-50" placeholder="Recipient name" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Amount</label>
              <div className="input-wrapper group">
                <div className="relative">
                  <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10"><i className="fas fa-coins text-sm" /></div>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required disabled={!!isLocked} min="0" step="0.01"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all disabled:opacity-50" placeholder="0.00" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Note (Optional)</label>
              <div className="input-wrapper group">
                <div className="relative">
                  <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10"><i className="fas fa-sticky-note text-sm" /></div>
                  <input type="text" value={note} onChange={e => setNote(e.target.value)} disabled={!!isLocked}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all disabled:opacity-50" placeholder="Add a note" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={!!isLocked}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <i className="fas fa-paper-plane" /> Send Transfer
            </button>
          </form>

          {/* Quick contacts */}
          <div className="mt-5">
            <p className="text-xs font-semibold text-gray-500 mb-2">Quick Contacts</p>
            <div className="flex flex-wrap gap-2">
              {snap.quickContacts.map(contact => (
                <button key={contact.name} onClick={() => setRecipient(contact.name)} disabled={!!isLocked}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 transition-all disabled:opacity-50">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                    {contact.initials}
                  </div>
                  <span className="text-xs">{contact.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent transfers */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Transfers</h2>
          {snap.recentTransfers.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No recent transfers</p>
          ) : (
            <div className="space-y-2">
              {snap.recentTransfers.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                      <i className="fas fa-paper-plane text-sm" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{t.to}</p>
                      <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(t.date), { addSuffix: true })}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">-{formatMoney(t.amount, snap.currency)}</p>
                    <span className="text-xs text-green-600 dark:text-green-400">{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
