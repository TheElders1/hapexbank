import { useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { getSession } from '../lib/auth'
import { formatMoney } from '../lib/utils'
import type { AccountSnapshot } from '../lib/types'

export default function Transactions() {
  const [snap] = useState<AccountSnapshot | null>(getSession())
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all')

  if (!snap) return null

  const filtered = snap.transactions.filter(tx => filter === 'all' || tx.type === filter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Full transaction history</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'credit', label: 'Income' },
          { key: 'debit', label: 'Expenses' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setFilter(tab.key as typeof filter)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === tab.key
              ? 'bg-primary-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-12">No transactions found</p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {filtered.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    <i className={`fas ${tx.type === 'credit' ? 'fa-arrow-down' : 'fa-arrow-up'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{tx.label}</p>
                    <p className="text-xs text-gray-500">{tx.category} • {format(new Date(tx.date), 'MMM d, yyyy')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {tx.type === 'credit' ? '+' : '-'}{formatMoney(tx.amount, snap.currency)}
                  </p>
                  <p className="text-xs text-gray-400">{formatDistanceToNow(new Date(tx.date), { addSuffix: true })}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
