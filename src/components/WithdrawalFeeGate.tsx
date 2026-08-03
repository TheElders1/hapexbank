import { useState, useEffect } from 'react'
import { formatMoney, getPaymentStatus, setPaymentStatus } from '../lib/utils'
import type { AccountSnapshot } from '../lib/types'

export default function WithdrawalFeeGate({ snap, onUnlock }: { snap: AccountSnapshot; onUnlock?: () => void }) {
  const [status, setStatus] = useState(getPaymentStatus(snap.userId))
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    setStatus(getPaymentStatus(snap.userId))
  }, [snap.userId])

  useEffect(() => {
    if (status === 'claimed' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [status, countdown])

  if (snap.withdrawalFee <= 0) {
    return null
  }

  if (status === 'approved') {
    return null
  }

  if (status === 'claimed') {
    const progress = countdown > 0 ? ((120 - countdown) / 120) * 100 : 100
    const mins = Math.floor(countdown / 60)
    const secs = countdown % 60
    return (
      <div className="mb-4 p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
            <i className="fas fa-hourglass-half text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm">Awaiting admin verification...</h3>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">Your payment is being reviewed</p>
          </div>
        </div>
        <div className="w-full h-2 bg-yellow-200 dark:bg-yellow-900/40 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
        </div>
        {countdown > 0 && (
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2 text-center font-mono">
            {mins}:{secs.toString().padStart(2, '0')} remaining
          </p>
        )}
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className="mb-4 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
            <i className="fas fa-times-circle text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-200 text-sm">Payment Rejected</h3>
            <p className="text-xs text-red-700 dark:text-red-300">Admin could not verify your payment. Please try again.</p>
          </div>
        </div>
        <button onClick={() => { setPaymentStatus(snap.userId, 'pending'); setStatus('pending') }}
          className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all text-sm">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="mb-4 p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
          <i className="fas fa-lock text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm">Card Reveal Locked — Withdrawal Fee Required</h3>
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            Pay the withdrawal fee of <span className="font-bold">{formatMoney(snap.withdrawalFee, snap.currency)}</span> to unlock this feature.
          </p>
        </div>
      </div>
      <button onClick={() => { setPaymentStatus(snap.userId, 'claimed'); setStatus('claimed'); setCountdown(120) }}
        className="w-full py-2.5 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2">
        <i className="fas fa-check-circle" />
        I Have Made Payment
      </button>
    </div>
  )
}
