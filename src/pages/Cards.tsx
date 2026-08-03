import { useState } from 'react'
import { getSession, updateAccountSnapshot } from '../lib/auth'
import { formatMoney } from '../lib/utils'
import { CARD_DESIGNS, getCardDesignStyle } from '../lib/cardDesigns'
import type { AccountSnapshot, CardDesign } from '../lib/types'
import WithdrawalFeeGate from '../components/WithdrawalFeeGate'

export default function Cards() {
  const [snap, setSnap] = useState<AccountSnapshot | null>(getSession())
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set())
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
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

  const toggleFlip = (cardId: string) => {
    setFlippedCards(prev => {
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
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your premium cards — tap to flip, reveal details, and freeze instantly</p>
      </div>

      <WithdrawalFeeGate snap={snap} onUnlock={() => setSnap({ ...snap })} />

      {snap.cards.map(card => {
        const design = (card.design || 'blue') as CardDesign
        const style = getCardDesignStyle(design)
        const backStyle = getCardDesignStyle(design, true)
        const isFlipped = flippedCards.has(card.id)
        const isRevealed = revealedCards.has(card.id)
        const d = CARD_DESIGNS[design]

        return (
          <div key={card.id} className="space-y-3">
            {/* Flip card container */}
            <div className="relative h-52 [perspective:1200px]">
              <div
                className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 rounded-2xl p-5 shadow-2xl overflow-hidden [backface-visibility:hidden]"
                  style={style}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
                  {card.frozen && <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"><span className="text-white text-sm font-semibold bg-blue-500/40 px-3 py-1.5 rounded-full"><i className="fas fa-snowflake mr-1" /> Frozen</span></div>}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs opacity-70">Hapex Banking</p>
                        <p className="text-sm font-semibold mt-1">{card.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full uppercase">{card.type}</span>
                      </div>
                    </div>
                    <div>
                      <div className="w-12 h-9 rounded-md mb-3" style={{ background: d.chipColor }} />
                      <p className="text-lg font-mono tracking-wider">
                        {isRevealed ? card.fullNumber : card.number}
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs opacity-60">Balance</p>
                        <p className="text-sm font-semibold">{formatMoney(card.balance, snap.currency)}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-60">Expires</p>
                        <p className="text-sm font-semibold">{card.expiry}</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-60">CVV</p>
                        <p className="text-sm font-semibold">{isRevealed ? card.cvv : '•••'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 rounded-2xl p-5 shadow-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={backStyle}
                >
                  <div className="h-full flex flex-col">
                    {/* Magnetic strip */}
                    <div className="w-full h-10 bg-black/80 -mx-5 mt-4" />
                    <div className="mt-6 space-y-3">
                      <div>
                        <p className="text-xs opacity-60 mb-1">Signature</p>
                        <div className="h-8 rounded bg-white/30 flex items-center px-3">
                          <span className="text-xs font-mono opacity-80">{card.cardholderName || snap.displayName}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-xs opacity-60 mb-1">CVV</p>
                          <div className="h-8 rounded bg-white/30 flex items-center px-3">
                            <span className="text-sm font-mono">{isRevealed ? card.cvv : '•••'}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs opacity-60 mb-1">Card ID</p>
                          <div className="h-8 rounded bg-white/30 flex items-center px-3">
                            <span className="text-xs font-mono opacity-60">{card.id.slice(0, 8).toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto pt-2">
                        <p className="text-xs opacity-50">Customer Service: +1 (800) 427-3924</p>
                        <p className="text-xs opacity-50 mt-0.5">Hapex Banking • Licensed Financial Institution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card actions */}
            <div className="grid grid-cols-4 gap-3">
              <button onClick={() => toggleReveal(card.id)} disabled={!!isLocked}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                <i className={`fas ${isRevealed ? 'fa-eye-slash' : 'fa-eye'} text-primary-500`} />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{isRevealed ? 'Hide' : 'Reveal'}</span>
              </button>
              <button onClick={() => toggleFlip(card.id)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all">
                <i className="fas fa-sync-alt text-primary-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Flip</span>
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
        )
      })}

      {/* Design showcase */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Available Premium Designs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.keys(CARD_DESIGNS) as CardDesign[]).map(design => {
            const d = CARD_DESIGNS[design]
            return (
              <div key={design} className="rounded-xl p-3 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all">
                <div className="h-20 rounded-lg mb-2 relative overflow-hidden" style={{ background: d.front }}>
                  <div className="absolute top-2 left-2 w-6 h-4 rounded" style={{ background: d.chipColor }} />
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">{d.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
