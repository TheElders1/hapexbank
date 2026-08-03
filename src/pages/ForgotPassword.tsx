import { Link } from 'react-router-dom'
import DarkModeToggle from '../components/DarkModeToggle'

export default function ForgotPassword() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
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
          <h1 className="text-3xl font-black mb-3 text-center bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">Password Recovery</h1>
          <h2 className="text-lg font-semibold mb-6 text-center text-white/90">Forgot Your Password?</h2>
          <p className="text-sm mb-8 max-w-md text-center text-white/80 leading-relaxed">Secure access to your Hapex account with our simple password recovery process.</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {[
              { icon: 'fa-shield-alt', title: 'Secure Recovery', sub: 'Safe process' },
              { icon: 'fa-key', title: 'Email Verification', sub: 'Link delivery' },
              { icon: 'fa-clock', title: 'Quick Process', sub: 'Fast recovery' },
              { icon: 'fa-user-shield', title: 'Account Protection', sub: 'Data security' },
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
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Forgot Password</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reset your password</p>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-gray-100/50 dark:border-gray-700/50 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100/50 dark:bg-primary-800/50 backdrop-blur-sm mb-4">
                <i className="fas fa-envelope text-2xl text-primary-600 dark:text-primary-300" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Reset Your Password</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enter your email to receive a reset link</p>
            </div>
            <div className="px-6 pb-6 pt-4">
              <form onSubmit={(e) => { e.preventDefault(); alert('Password reset link sent! Check your email.') }} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                  <div className="input-wrapper group">
                    <div className="relative">
                      <div className="input-icon group-focus-within:text-primary-500 transition-colors z-10"><i className="fas fa-envelope text-sm" /></div>
                      <input type="email" required placeholder="name@email.com" autoComplete="email"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all" />
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center group text-sm">
                    <i className="fas fa-paper-plane mr-2 group-hover:translate-x-1 transition-transform text-sm" />
                    <span>Send Password Reset Link</span>
                  </button>
                </div>
                <div className="pt-1">
                  <Link to="/login" className="w-full py-3 px-4 bg-gray-100/90 dark:bg-gray-700/90 hover:bg-gray-200/90 dark:hover:bg-gray-600/90 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-all duration-300 flex items-center justify-center group text-sm border border-gray-200/50 dark:border-gray-600/50">
                    <i className="fas fa-sign-in-alt mr-2 group-hover:-translate-x-1 transition-transform text-sm" />
                    Return to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500 max-w-xs mx-auto leading-relaxed">© 2026 Hapex. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
