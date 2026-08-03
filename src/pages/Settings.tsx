import { useState } from 'react'
import { getSession, updateAccountSnapshot } from '../lib/auth'
import { getInitials } from '../lib/utils'
import type { AccountSnapshot } from '../lib/types'

export default function Settings() {
  const [snap, setSnap] = useState<AccountSnapshot | null>(getSession())
  const [tab, setTab] = useState<'profile' | 'security' | 'alerts'>('profile')
  const [toast, setToast] = useState(false)
  const [profile, setProfile] = useState({
    name: snap?.displayName || '',
    email: snap?.email || '',
    phone: snap?.phone || '',
    timezone: 'UTC',
  })

  const [securityToggles, setSecurityToggles] = useState({
    biometric: true, quantum: true, aiFraud: true, twoFactor: false, sessionTimeout: true,
  })
  const [alertToggles, setAlertToggles] = useState({
    transaction: true, security: true, marketing: false, weekly: true, push: true,
  })

  if (!snap) return null

  const handleSave = async () => {
    if (!snap) return
    const updatedSnap: AccountSnapshot = { ...snap, displayName: profile.name, email: profile.email, phone: profile.phone }
    setSnap(updatedSnap)
    await updateAccountSnapshot(snap.userId, updatedSnap)
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button onClick={onClick} className={`relative w-11 h-6 rounded-full transition-all ${on ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {[
          { key: 'profile', label: 'Profile', icon: 'fa-user' },
          { key: 'security', label: 'Security', icon: 'fa-shield-alt' },
          { key: 'alerts', label: 'Alerts', icon: 'fa-bell' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${tab === t.key
              ? 'border-primary-600 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            <i className={`fas ${t.icon}`} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl font-bold">
              {getInitials(profile.name)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{profile.name}</p>
              <p className="text-xs text-gray-500">{snap.userId}</p>
            </div>
          </div>
          {[
            { key: 'name', label: 'Full Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'phone', label: 'Phone', type: 'tel' },
          ].map(field => (
            <div key={field.key} className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{field.label}</label>
              <input type={field.type} value={profile[field.key as keyof typeof profile]} onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all" />
            </div>
          ))}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Timezone</label>
            <select value={profile.timezone} onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm">
              <option>UTC</option><option>EST</option><option>PST</option><option>GMT</option><option>CET</option>
            </select>
          </div>
          <button onClick={handleSave} className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg transition-all text-sm">
            Save Changes
          </button>
        </div>
      )}

      {tab === 'security' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50 space-y-1">
          {[
            { key: 'biometric', label: 'Biometric Login', icon: 'fa-fingerprint', desc: 'Use fingerprint or face recognition' },
            { key: 'quantum', label: 'Quantum Encryption', icon: 'fa-atom', desc: 'Next-gen quantum-grade security' },
            { key: 'aiFraud', label: 'AI Fraud Detection', icon: 'fa-brain', desc: 'Real-time fraud monitoring' },
            { key: 'twoFactor', label: 'Two-Factor Authentication', icon: 'fa-mobile-alt', desc: 'Extra layer of security' },
            { key: 'sessionTimeout', label: 'Session Timeout', icon: 'fa-clock', desc: 'Auto logout after inactivity' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                  <i className={`fas ${item.icon}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
              <Toggle on={securityToggles[item.key as keyof typeof securityToggles]} onClick={() => setSecurityToggles(s => ({ ...s, [item.key]: !s[item.key as keyof typeof securityToggles] }))} />
            </div>
          ))}
        </div>
      )}

      {tab === 'alerts' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50 space-y-1">
          {[
            { key: 'transaction', label: 'Transaction Alerts', icon: 'fa-exchange-alt', desc: 'Get notified on every transaction' },
            { key: 'security', label: 'Security Alerts', icon: 'fa-shield-alt', desc: 'Suspicious activity warnings' },
            { key: 'marketing', label: 'Marketing', icon: 'fa-bullhorn', desc: 'Product updates and offers' },
            { key: 'weekly', label: 'Weekly Report', icon: 'fa-file-alt', desc: 'Summary of your spending' },
            { key: 'push', label: 'Instant Push Alerts', icon: 'fa-bell', desc: 'Real-time push notifications' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                  <i className={`fas ${item.icon}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
              <Toggle on={alertToggles[item.key as keyof typeof alertToggles]} onClick={() => setAlertToggles(s => ({ ...s, [item.key]: !s[item.key as keyof typeof alertToggles] }))} />
            </div>
          ))}
          <button onClick={handleSave} className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg transition-all text-sm mt-3">
            Save Preferences
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-xl bg-green-600 text-white shadow-2xl flex items-center gap-2 animate-float">
          <i className="fas fa-check-circle" /> Settings saved successfully
        </div>
      )}
    </div>
  )
}
