import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../lib/auth'
import DarkModeToggle from '../components/DarkModeToggle'
import PageLoader from '../components/PageLoader'

export default function Login() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showLoader, setShowLoader] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const snap = await login(userId, password)
      if (!snap) {
        setError('Invalid username or password')
        setLoading(false)
        return
      }
      setShowLoader(true)
      setTimeout(() => navigate('/dashboard'), 800)
    } catch {
      setError('Login failed. Please try again.')
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
          <h1 className="text-3xl font-black mb-3 text-center bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">Welcome Back</h1>
          <h2 className="text-lg font-semibold mb-6 text-center text-white/90">Hapex</h2>
          <p className="text-sm mb-8 max-w-md text-center text-white/80 leading-relaxed">Swift and secure money transfers worldwide. Experience banking reimagined.</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {[
              { icon: 'fa-shield-alt', title: 'Bank-Grade Security', sub: '256-bit encryption' },
              { icon: 'fa-bolt', title: 'Instant Transfers', sub: 'Real-time processing' },
              { icon: 'fa-globe', title: 'Global Reach', sub: '200+ countries' },
              { icon: 'fa-mobile-alt', title: 'Mobile First', sub: 'iOS & Android' },
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
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-6">
            <div className="relative inline-block mb-3 mt-10">
              <div className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-lg" />
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-3 border border-gray-200/50 dark:border-gray-700/50">
                <img src="/storage/app/public/photos/FfZWxYEREMC8mqEkVUAlWHyFmDRlJTFVPlyT5EYx.png" alt="Logo" className="h-10 mx-auto" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Welcome Back</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sign in to Hapex</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <i className="fas fa-exclamation-circle" /> {error}
            </div>
          )}

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-gray-100/50 dark:border-gray-700/50">
              <div className="hidden lg:block">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Sign In</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Access your Hapex account</p>
              </div>
              <div className="lg:hidden">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center">Enter Your Credentials</h2>
              </div>
            </div>
            <div className="px-6 pb-6 pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Email Address or Username</label>
                  <div className="input-wrapper group">
                    <div className="relative">
                      <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10">
                        <i className="fas fa-envelope text-sm" />
                      </div>
                      <input type="text" value={userId} onChange={e => setUserId(e.target.value)} required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 backdrop-blur-sm transition-all duration-300 text-sm"
                        placeholder="Enter your email address" autoComplete="email" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
                    <Link to="/forgot-password" className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors">Forgot Password?</Link>
                  </div>
                  <div className="input-wrapper group">
                    <div className="relative">
                      <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10">
                        <i className="fas fa-lock text-sm" />
                      </div>
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 backdrop-blur-sm transition-all duration-300 text-sm"
                        placeholder="Enter your password" autoComplete="current-password" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500 hover:text-primary-500 transition-colors">
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center group cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300/50 dark:border-gray-600/50 text-primary-600 shadow-sm focus:ring-primary-200/50 dark:bg-gray-700/50 transition-all" defaultChecked />
                    <span className="ml-2 text-xs font-medium text-gray-600 dark:text-gray-400">Keep me signed in</span>
                  </label>
                </div>
                <div className="pt-2">
                  <button type="submit" disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group text-sm disabled:opacity-50">
                    <i className="fas fa-sign-in-alt mr-2 group-hover:translate-x-1 transition-transform text-sm" />
                    <span>{loading ? 'Signing in...' : 'Sign In to Account'}</span>
                  </button>
                </div>
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200/50 dark:border-gray-700/50" /></div>
                  <div className="relative flex justify-center text-xs"><span className="px-3 bg-white/90 dark:bg-gray-800/90 text-gray-500 dark:text-gray-400 font-medium">New to Hapex?</span></div>
                </div>
                <div>
                  <Link to="/signup" className="w-full py-3 px-4 bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 text-gray-800 dark:text-gray-200 font-semibold rounded-xl border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-center group hover:scale-[1.02] text-sm">
                    <i className="fas fa-user-plus mr-2 group-hover:scale-110 transition-transform text-sm" />
                    <span>Create New Account</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 text-center space-y-3">
            <div className="flex items-center justify-center space-x-4 text-xs">
              <span className="text-gray-600 dark:text-gray-400 font-medium flex items-center"><i className="fas fa-shield-alt mr-1 text-xs" />Security</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium flex items-center"><i className="fas fa-headset mr-1 text-xs" />Support</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium flex items-center"><i className="fas fa-file-contract mr-1 text-xs" />Terms</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 max-w-xs mx-auto leading-relaxed">By signing in, you agree to our Terms of Service and Privacy Policy. Your data is protected with bank-grade security.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
