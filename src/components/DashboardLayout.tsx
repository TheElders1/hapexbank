import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getSession, clearSession, isAdminUser } from '../lib/auth'
import type { AccountSnapshot } from '../lib/types'
import DarkModeToggle from './DarkModeToggle'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'fa-chart-line' },
  { path: '/transactions', label: 'Transactions', icon: 'fa-exchange-alt' },
  { path: '/cards', label: 'Cards', icon: 'fa-credit-card' },
  { path: '/transfers', label: 'Transfers', icon: 'fa-paper-plane' },
  { path: '/settings', label: 'Settings', icon: 'fa-cog' },
]

interface NotificationItem {
  icon: string
  color: string
  title: string
  desc: string
  time: string
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [session, setSession] = useState<AccountSnapshot | null>(null)
  const [showNotifs, setShowNotifs] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => { setSession(getSession()) }, [location.pathname])

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

  if (!session) return null

  const navItems = [
    ...NAV_ITEMS,
    ...(isAdminUser(session) ? [{ path: '/admin-verification', label: 'Admin Verify', icon: 'fa-shield-halved' }] : []),
  ]

  const notifications: NotificationItem[] = [
    { icon: 'fa-shield-alt', color: 'text-green-500', title: 'Security check passed', desc: 'Your account was verified successfully', time: '2m ago' },
    { icon: 'fa-chart-line', color: 'text-primary-500', title: 'Income trend updated', desc: 'Your income has increased by 12% this month', time: '1h ago' },
    { icon: 'fa-credit-card', color: 'text-yellow-500', title: 'Card reminder', desc: 'Your virtual card is ready to use', time: '3h ago' },
  ]

  const logoSrc = '/storage/app/public/photos/FfZWxYEREMC8mqEkVUAlWHyFmDRlJTFVPlyT5EYx.png'
  const sidebarHeaderClass = 'flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-primary-700 to-primary-800 dark:from-primary-800 dark:to-primary-900'
  const navLinkClass = (active: boolean) =>
    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ' +
    (active
      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold'
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar - Desktop */}
      <aside className={'hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed inset-y-0 left-0 z-30 transition-all duration-300 ' + (sidebarOpen ? 'lg:w-20' : 'lg:w-64')}>
        <div className={sidebarHeaderClass}>
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={logoSrc} alt="Logo" className={'h-8 ' + (sidebarOpen ? 'hidden' : '')} />
            {!sidebarOpen && <span className="font-bold text-white">Hapex</span>}
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/70 hover:text-white transition-colors">
            <i className={'fas ' + (sidebarOpen ? 'fa-chevron-right' : 'fa-chevron-left')} />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={navLinkClass(location.pathname === item.path)}>
              <i className={'fas ' + item.icon + ' w-5 text-center'} />
              {!sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full">
            <i className="fas fa-sign-out-alt w-5 text-center" />
            {!sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />}
      <aside className={'lg:hidden fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ' + (sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className={sidebarHeaderClass}>
          <Link to="/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <img src={logoSrc} alt="Logo" className="h-8" />
            <span className="font-bold text-white">Hapex</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-white/70 hover:text-white">
            <i className="fas fa-times" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} className={navLinkClass(location.pathname === item.path)}>
              <i className={'fas ' + item.icon + ' w-5 text-center'} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full">
            <i className="fas fa-sign-out-alt w-5 text-center" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={'flex-1 ' + (sidebarOpen ? 'lg:ml-20' : 'lg:ml-64') + ' transition-all duration-300'}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-gradient-to-r from-primary-700 to-primary-800 dark:from-primary-800 dark:to-primary-900 backdrop-blur-xl border-b border-primary-600/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-white p-2">
              <i className="fas fa-bars" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
                {session.initials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">{session.displayName}</p>
                <p className="text-xs text-white/70">{session.currency} Account</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110">
                <i className="fas fa-bell h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center">{notifications.length}</span>
              </button>
              {showNotifs && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-700/50">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors border-b border-gray-50 dark:border-gray-700/30 last:border-0">
                          <div className={'w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center ' + n.color}>
                            <i className={'fas ' + n.icon + ' text-sm'} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{n.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{n.desc}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-100 dark:border-gray-700/50">
                      <button onClick={() => { setShowNotifs(false); navigate('/settings') }} className="w-full py-2 text-xs font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors">Manage notifications</button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <DarkModeToggle />
          </div>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
