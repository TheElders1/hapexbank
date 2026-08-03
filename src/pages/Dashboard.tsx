import { useState, useEffect } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { getSession } from '../lib/auth'
import { formatMoney } from '../lib/utils'
import type { AccountSnapshot } from '../lib/types'

export default function Dashboard() {
  const [snap, setSnap] = useState<AccountSnapshot | null>(getSession())
  const [showWelcome, setShowWelcome] = useState(false)
  const [insights, setInsights] = useState([
    { id: 1, icon: 'fa-chart-line', title: 'Income Trend', text: 'Your income has increased by 12% this month compared to last month.', color: 'green' },
    { id: 2, icon: 'fa-atom', title: 'Quantum Encryption', text: 'Your account is protected by quantum-grade encryption. Status: Active.', color: 'blue' },
    { id: 3, icon: 'fa-piggy-bank', title: 'Savings Suggestion', text: 'Based on your spending patterns, you could save an extra $500 this month.', color: 'purple' },
  ])

  useEffect(() => {
    const seen = localStorage.getItem(`hapex_welcomed_${snap?.userId}`)
    if (!seen && snap) {
      setShowWelcome(true)
      localStorage.setItem(`hapex_welcomed_${snap.userId}`, '1')
    }
  }, [snap?.userId])

  if (!snap) return null

  const dismissInsight = (id: number) => setInsights(insights.filter(i => i.id !== id))

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
        <div className="relative z-10">
          <p className="text-sm text-white/80">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
          <h1 className="text-2xl font-bold mt-1">Welcome back, {snap.displayName}</h1>
          <p className="text-sm text-white/80 mt-1">Here's what's happening with your account today.</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Send Money', icon: 'fa-paper-plane', color: 'from-primary-500 to-primary-700', link: '/transfers' },
          { label: 'Add Card', icon: 'fa-credit-card', color: 'from-purple-500 to-purple-700', link: '/cards' },
          { label: 'Transactions', icon: 'fa-exchange-alt', color: 'from-green-500 to-green-700', link: '/transactions' },
          { label: 'Settings', icon: 'fa-cog', color: 'from-orange-500 to-orange-700', link: '/settings' },
        ].map(action => (
          <a key={action.label} href={action.link} className="group bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-soft border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform`}>
              <i className={`fas ${action.icon}`} />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</p>
          </a>
        ))}
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Balance', value: formatMoney(snap.balance, snap.currency), icon: 'fa-wallet', trend: '+2.5%', trendUp: true, color: 'from-primary-500 to-primary-700' },
          { label: 'Income', value: formatMoney(snap.income, snap.currency), icon: 'fa-arrow-down', trend: '+12%', trendUp: true, color: 'from-green-500 to-green-700' },
          { label: 'Expenses', value: formatMoney(snap.expenses, snap.currency), icon: 'fa-arrow-up', trend: '-3%', trendUp: false, color: 'from-red-500 to-red-700' },
        ].map(card => (
          <div key={card.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white`}>
                <i className={`fas ${card.icon}`} />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${card.trendUp ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                <i className={`fas ${card.trendUp ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`} />{card.trend}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{card.label}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <i className="fas fa-robot text-primary-500" /> AI Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map(insight => (
              <div key={insight.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-soft border border-gray-200/50 dark:border-gray-700/50 relative group">
                <button onClick={() => dismissInsight(insight.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <i className="fas fa-times text-xs" />
                </button>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                  insight.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  insight.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                  'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                }`}>
                  <i className={`fas ${insight.icon} text-sm`} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{insight.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent transactions preview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Transactions</h2>
          <a href="/transactions" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View all</a>
        </div>
        <div className="space-y-2">
          {snap.transactions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No transactions yet</p>
          ) : (
            snap.transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    <i className={`fas ${tx.type === 'credit' ? 'fa-arrow-down' : 'fa-arrow-up'} text-sm`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{tx.label}</p>
                    <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(tx.date), { addSuffix: true })}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{formatMoney(tx.amount, snap.currency)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Welcome overlay */}
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {snap.initials}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome to Hapex</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{snap.displayName}</p>
              <div className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold mb-6">
                {snap.currency} Member
              </div>
              <button onClick={() => setShowWelcome(false)}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-sm">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
