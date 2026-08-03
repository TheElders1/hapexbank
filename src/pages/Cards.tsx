import { useState } from 'react'
import { getSession, updateAccountSnapshot } from '../lib/auth'
import { formatMoney } from '../lib/utils'
import type { AccountSnapshot } from '../lib/types'
import WithdrawalFeeGate from '../components/WithdrawalFeeGate'

export default function Cards() {
  const [snap, setSnap] = useState<AccountSnapshot | null>(getSession())
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)

  if (!snap) return null

  const isLocked = snap.withdrawalFee > 0 &&
    (localStorage.getItem('hapex_payment_statuses') &&
     JSON.parse(localStorage.getItem('hapex_payment_statuses') || '{}')[snap.userId] !== 'approved')

  const toggleReveal = (cardId: string) => {
    if (isLocked) return
    setRevealedCards(prev => {
      const next = new Set(prev)
      if (next.has(cardId)) next.delete(cardId)
      else next.add(cardId)
      return next
    })
  }

  const copyCardNumber = (cardId: string, number: string) => {
    navigator.clipboard.writeText(number.replace(/\s/g, ''))
    setCopiedId(cardId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleFreeze = async (cardId: string) => {
    if (!snap) return
    const updatedCards = snap.cards.map(c => c.id === cardId ? { ...c, frozen: !c.frozen } : c)
    const updatedSnap = { ...snap, cards: updatedCards }
    setSnap(updatedSnap)
    await updateAccountSnapshot(snap.userId, updatedSnap)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cards</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your virtual and physical cards</p>
      </div>

      <WithdrawalFeeGate snap={snap} onUnlock={() => setSnap({ ...snap })} />

      {snap.cards.map(card => (
        <div key={card.id} className="space-y-3">
          {/* Holographic card */}
          <div className={`relative h-52 rounded-2xl bg-gradient-to-br ${card.color} p-5 text-white shadow-2xl overflow-hidden ${card.frozen ? 'opacity-60' : ''}`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/70">Hapex Banking</p>
                  <p className="text-sm font-semibold mt-1">{card.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {card.frozen && <span className="text-xs bg-white/20 px-2 py-1 rounded-full"><i className="fas fa-snowflake mr-1" />Frozen</span>}
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full uppercase">{card.type}</span>
                </div>
              </div>
              <div>
                <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 mb-3" />
                <p className="text-lg font-mono tracking-wider">
                  {revealedCards.has(card.id) ? card.fullNumber : card.number}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-white/60">Balance</p>
                  <p className="text-sm font-semibold">{formatMoney(card.balance, snap.currency)}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60">Expires</p>
                  <p className="text-sm font-semibold">{card.expiry}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60">CVV</p>
                  <p className="text-sm font-semibold">{revealedCards.has(card.id) ? card.cvv : '•••'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card actions */}
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => toggleReveal(card.id)} disabled={!!isLocked}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              <i className={`fas ${revealedCards.has(card.id) ? 'fa-eye-slash' : 'fa-eye'} text-primary-500`} />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{revealedCards.has(card.id) ? 'Hide' : 'Reveal'}</span>
            </button>
            <button onClick={() => copyCardNumber(card.id, card.fullNumber)} disabled={!!isLocked}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              <i className={`fas ${copiedId === card.id ? 'fa-check text-green-500' : 'fa-copy text-primary-500'}`} />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{copiedId === card.id ? 'Copied!' : 'Copy'}</span>
            </button>
            <button onClick={() => toggleFreeze(card.id)}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all">
              <i className={`fas ${card.frozen ? 'fa-fire text-orange-500' : 'fa-snowflake text-blue-500'}`} />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{card.frozen ? 'Unfreeze' : 'Freeze'}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
