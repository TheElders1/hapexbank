import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../lib/auth'
import { supabase } from '../lib/supabase'
import DarkModeToggle from '../components/DarkModeToggle'
import PageLoader from '../components/PageLoader'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', userId: '', phone: '', dob: '', address: '',
    password: '', confirmPassword: '', terms: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  const update = (key: string, val: string | boolean) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return }
    if (!form.terms) { setError('Please accept the terms to continue'); return }
    setLoading(true)
    try {
      const { data: existing } = await supabase.from('accounts').select('user_id').eq('user_id', form.userId).maybeSingle()
      if (existing) { setError('This username is already taken'); setLoading(false); return }

      await signup({
        userId: form.userId,
        name: form.name,
        email: form.userId + '@hapexbank.com',
        phone: form.phone,
        password: form.password,
        currency: 'USD',
        balance: 0,
        withdrawalFee: 0,
      })
      setShowLoader(true)
      setTimeout(() => navigate('/dashboard'), 800)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
      setLoading(false)
    }
  }

  if (showLoader) return <PageLoader />

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full backdrop-blur-sm floating-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-white/5 rounded-full backdrop-blur-sm floating" />
          <div className="absolute top-2/3 left-1/3 w-32 h-32 bg-white/15 rounded-full backdrop-blur-sm floating-slower" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
        </div>
        <div className="relative flex flex-col justify-center items-center w-full h-full text-white p-8 z-10">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <img src="/storage/app/public/photos/FfZWxYEREMC8mqEkVUAlWHyFmDRlJTFVPlyT5EYx.png" alt="Logo" className="h-12" />
            </div>
          </div>
          <h1 className="text-3xl font-black mb-3 text-center bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">Join Hapex</h1>
          <h2 className="text-lg font-semibold mb-6 text-center text-white/90">Open Your Account</h2>
          <p className="text-sm mb-8 max-w-md text-center text-white/80 leading-relaxed">Create your account in minutes and start banking with the future of finance.</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {[
              { icon: 'fa-rocket', title: 'Quick Setup', sub: 'Minutes to start' },
              { icon: 'fa-shield-alt', title: 'Secure', sub: 'Bank-grade' },
              { icon: 'fa-globe', title: 'Global', sub: '150+ countries' },
              { icon: 'fa-coins', title: 'Multi-Currency', sub: 'USD, EUR, GBP' },
            ].map(f => (
              <div key={f.title} className="group flex items-center space-x-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i className={`fas ${f.icon} text-sm`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                  <p className="text-xs text-white/70">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-3 lg:p-8 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm relative">
        <div className="fixed top-4 right-4 z-50"><DarkModeToggle /></div>
        <div className="w-full max-w-sm max-h-screen overflow-y-auto">
          <div className="lg:hidden text-center mb-6">
            <div className="relative inline-block mb-3 mt-10">
              <div className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-lg" />
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-3 border border-gray-200/50 dark:border-gray-700/50">
                <img src="/storage/app/public/photos/FfZWxYEREMC8mqEkVUAlWHyFmDRlJTFVPlyT5EYx.png" alt="Logo" className="h-10 mx-auto" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Create Account</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Join Hapex today</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle" /> {error}
            </div>
          )}

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-gray-100/50 dark:border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Create Your Account</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fill in your details to get started</p>
            </div>
            <div className="px-6 pb-6 pt-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                {[
                  { key: 'name', label: 'Full Name', icon: 'fa-user', type: 'text', placeholder: 'John Doe' },
                  { key: 'userId', label: 'Username / User ID', icon: 'fa-id-badge', type: 'text', placeholder: 'johndoe' },
                  { key: 'phone', label: 'Phone', icon: 'fa-phone', type: 'tel', placeholder: '+1 234 567 8900' },
                  { key: 'dob', label: 'Date of Birth', icon: 'fa-calendar', type: 'date', placeholder: '' },
                  { key: 'address', label: 'Address', icon: 'fa-map-marker-alt', type: 'text', placeholder: '123 Main St, City' },
                ].map(field => (
                  <div key={field.key} className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{field.label}</label>
                    <div className="input-wrapper group">
                      <div className="relative">
                        <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10">
                          <i className={`fas ${field.icon} text-sm`} />
                        </div>
                        <input type={field.type} value={form[field.key as keyof typeof form] as string} onChange={e => update(field.key, e.target.value)} required
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all" placeholder={field.placeholder} />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
                  <div className="input-wrapper group">
                    <div className="relative">
                      <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10"><i className="fas fa-lock text-sm" /></div>
                      <input type="password" value={form.password} onChange={e => update('password', e.target.value)} required
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all" placeholder="Enter password" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Confirm Password</label>
                  <div className="input-wrapper group">
                    <div className="relative">
                      <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10"><i className="fas fa-lock text-sm" /></div>
                      <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all" placeholder="Confirm password" />
                    </div>
                  </div>
                </div>
                <label className="flex items-start gap-2 pt-1 cursor-pointer">
                  <input type="checkbox" checked={form.terms} onChange={e => update('terms', e.target.checked)} required
                    className="mt-0.5 rounded border-gray-300/50 dark:border-gray-600/50 text-primary-600 focus:ring-primary-200/50 dark:bg-gray-700/50" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">I agree to the <Link to="/terms-of-service" className="text-primary-600 dark:text-primary-400">Terms of Service</Link> and <Link to="/privacy" className="text-primary-600 dark:text-primary-400">Privacy Policy</Link></span>
                </label>
                <div className="pt-2">
                  <button type="submit" disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group text-sm disabled:opacity-50">
                    <i className="fas fa-user-plus mr-2 group-hover:scale-110 transition-transform text-sm" />
                    <span>{loading ? 'Creating account...' : 'Create Account'}</span>
                  </button>
                </div>
                <div className="text-center pt-2">
                  <p className="text-xs text-gray-500">Already have an account? <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-500">Sign in</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
