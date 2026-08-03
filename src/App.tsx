import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { getSession } from './lib/auth'
import type { AccountSnapshot } from './lib/types'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Cards from './pages/Cards'
import Transfers from './pages/Transfers'
import Settings from './pages/Settings'
import AdminPanel from './pages/AdminPanel'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import DashboardLayout from './components/DashboardLayout'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const session = getSession()
  if (!session) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const channel = supabase
      .channel('accounts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'accounts' }, () => {
        setTick(t => t + 1)
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms-of-service" element={<Terms />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><DashboardLayout><Transactions /></DashboardLayout></ProtectedRoute>} />
      <Route path="/cards" element={<ProtectedRoute><DashboardLayout><Cards /></DashboardLayout></ProtectedRoute>} />
      <Route path="/transfers" element={<ProtectedRoute><DashboardLayout><Transfers /></DashboardLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin-verification" element={<AdminPanel />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export type { AccountSnapshot }
