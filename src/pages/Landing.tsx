import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const stats = [
    { value: '2M+', label: 'Active Customers' },
    { value: '150+', label: 'Countries Supported' },
    { value: '$50B+', label: 'Processed Annually' },
    { value: '4.9★', label: 'App Store Rating' },
  ]

  const features = [
    { icon: 'fa-globe', title: 'Global ATM Access', desc: 'Withdraw cash from over 3 million ATMs worldwide with zero foreign transaction fees.' },
    { icon: 'fa-bolt', title: 'Instant Mobile Transfers', desc: 'Send money to anyone in seconds with our lightning-fast payment network.' },
    { icon: 'fa-credit-card', title: 'Virtual & Physical Cards', desc: 'Get both a physical card and a virtual card for online purchases instantly.' },
    { icon: 'fa-shield-alt', title: 'Bank-Grade Security', desc: 'Your money is protected with 256-bit encryption and quantum-grade security.' },
    { icon: 'fa-rocket', title: 'Lightning-Fast Payments', desc: 'Experience real-time processing with no delays or hidden holds.' },
    { icon: 'fa-coins', title: 'Multi-Currency Wallets', desc: 'Hold and convert between USD, EUR, and GBP with competitive rates.' },
  ]

  const steps = [
    { num: 1, icon: 'fa-user-plus', title: 'Sign Up', desc: 'Create your account in minutes with just a few details.' },
    { num: 2, icon: 'fa-id-card', title: 'Verify Identity', desc: 'Quick and secure identity verification process.' },
    { num: 3, icon: 'fa-chart-line', title: 'Start Banking', desc: 'Access all features and start managing your money.' },
  ]

  const testimonials = [
    { name: 'Sarah Chen', role: 'Freelance Designer', rating: 5, quote: 'Hapex has transformed how I handle international payments. The speed and security are unmatched.', initials: 'SC' },
    { name: 'Marcus Webb', role: 'Small Business Owner', rating: 5, quote: 'The multi-currency wallets save me thousands in conversion fees every month. Game changer.', initials: 'MW' },
    { name: 'Elena Rossi', role: 'Digital Nomad', rating: 5, quote: 'I travel constantly and Hapex is the only banking app I trust. Global ATM access is a lifesaver.', initials: 'ER' },
  ]

  const faqs = [
    { q: 'What are the fees?', a: 'Hapex offers transparent pricing with no hidden fees. Standard transfers are free, and currency conversion uses competitive mid-market rates.' },
    { q: 'How long do transfers take?', a: 'Most transfers are instant. International transfers typically arrive within 1-2 business days depending on the destination.' },
    { q: 'Which countries are supported?', a: 'Hapex supports 150+ countries worldwide with ongoing expansion. Check our app for the latest list of supported regions.' },
    { q: 'How long does account opening take?', a: 'Account opening takes less than 5 minutes. Simply fill in your details, verify your identity, and you are ready to bank.' },
    { q: 'Is my money safe?', a: 'Yes. Your deposits are FDIC insured up to $250,000 and protected by bank-grade 256-bit encryption with quantum-grade security layers.' },
    { q: 'Do you offer business accounts?', a: 'Yes, Hapex offers business accounts with advanced features like multi-user access, expense tracking, and API integration.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar — always blue so the white logo is visible */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-primary-700 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-800 dark:to-primary-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/storage/app/public/photos/FfZWxYEREMC8mqEkVUAlWHyFmDRlJTFVPlyT5EYx.png" alt="Hapex" className="h-9" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#how" className="text-sm font-medium text-white/80 hover:text-white transition-colors">How It Works</a>
            <a href="#faq" className="text-sm font-medium text-white/80 hover:text-white transition-colors">FAQ</a>
            <Link to="/login" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Sign In</Link>
            <Link to="/signup" className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-xl backdrop-blur-sm transition-all">Open Account</Link>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white p-2">
              <i className={`fas ${mobileMenu ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-primary-700 dark:bg-primary-900 border-t border-white/10 px-4 py-3 space-y-2">
            <a href="#features" onClick={() => setMobileMenu(false)} className="block text-sm text-white/80 py-2">Features</a>
            <a href="#how" onClick={() => setMobileMenu(false)} className="block text-sm text-white/80 py-2">How It Works</a>
            <a href="#faq" onClick={() => setMobileMenu(false)} className="block text-sm text-white/80 py-2">FAQ</a>
            <Link to="/login" className="block text-sm text-white/80 py-2">Sign In</Link>
            <Link to="/signup" className="block px-4 py-2 bg-white/20 text-white text-sm font-semibold rounded-xl text-center">Open Account</Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-200/20 dark:bg-primary-800/20 rounded-full blur-3xl floating-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-200/20 dark:bg-accent-800/20 rounded-full blur-3xl floating" />
        </div>
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold mb-6 animate-pulse-slow">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              Now serving 150+ countries
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-4">
              Bank with us.<br />Anywhere in the world.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto lg:mx-0">
              Swift and secure money transfers worldwide. Experience banking reimagined with Hapex.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/signup" className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                <i className="fas fa-user-plus" /> Open Your Account
              </Link>
              <Link to="/login" className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all flex items-center justify-center gap-2">
                <i className="fas fa-sign-in-alt" /> Sign In
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
              {[
                { icon: 'fa-shield-alt', text: 'FDIC Insured' },
                { icon: 'fa-star', text: '4.9 Rating' },
                { icon: 'fa-users', text: '2M+ Users' },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2">
                  <i className={`fas ${b.icon} text-primary-500`} />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative">
              <img src="/images/home/metro.jpg" alt="Modern banking" className="absolute -inset-8 w-96 h-72 object-cover rounded-2xl opacity-20 blur-sm" />
              <div className="w-80 h-52 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-6 text-white shadow-2xl floating relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-white/70">Hapex Banking</p>
                      <p className="text-sm font-semibold mt-1">Platinum Card</p>
                    </div>
                    <i className="fab fa-cc-visa text-2xl" />
                  </div>
                  <p className="text-lg font-mono tracking-wider">4321 •••• •••• 8901</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-white/60">Balance</p>
                      <p className="text-sm font-semibold">$50,000.00</p>
                    </div>
                    <p className="text-sm font-semibold">12/29</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-primary-600 dark:text-primary-400">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Everything you need</h2>
            <p className="text-gray-500 dark:text-gray-400">Powerful features designed for modern banking</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative">
              <img src="/images/home/feature.jpg" alt="Hapex banking features" className="w-full h-64 object-cover rounded-2xl shadow-xl" />
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-soft border border-gray-200/50 dark:border-gray-700/50 hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                    <i className="fas fa-check text-sm" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">Bank-Grade Security</p>
                    <p className="text-xs text-gray-500">256-bit encryption</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {features.slice(0, 3).map(f => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white flex-shrink-0">
                    <i className={`fas ${f.icon} text-sm`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{f.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <i className={`fas ${f.icon} text-lg`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-4 lg:px-8 bg-white dark:bg-gray-800 border-y border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">How it works</h2>
            <p className="text-gray-500 dark:text-gray-400">Get started in three simple steps</p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700" />
            {steps.map(s => (
              <div key={s.num} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg mb-4">
                  <i className={`fas ${s.icon} text-xl`} />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center">{s.num}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Loved by customers</h2>
            <p className="text-gray-500 dark:text-gray-400">Join millions who trust Hapex</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <i key={i} className="fas fa-star text-yellow-400 text-sm" />)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">{t.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-2">Ready to bank with us?</h2>
              <p className="text-white/80 mb-6">Open your account in minutes and start banking with the future of finance.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/signup" className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all">Open Your Account</Link>
                <Link to="/login" className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 lg:px-8 bg-white dark:bg-gray-800 border-y border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Frequently asked questions</h2>
            <p className="text-gray-500 dark:text-gray-400">Everything you need to know</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                  <i className={`fas ${openFaq === i ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-400 transition-transform`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 lg:px-8 bg-gray-900 dark:bg-black text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/storage/app/public/photos/FfZWxYEREMC8mqEkVUAlWHyFmDRlJTFVPlyT5EYx.png" alt="Hapex" className="h-8" />
            </div>
            <p className="text-sm mb-4">Banking reimagined for the modern world.</p>
            <div className="flex gap-3">
              {['fa-twitter', 'fa-facebook', 'fa-instagram', 'fa-linkedin'].map(icon => (
                <a key={icon} href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <i className={`fab ${icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
              <li><Link to="/cards" className="hover:text-primary-400 transition-colors">Cards</Link></li>
              <li><Link to="/transfers" className="hover:text-primary-400 transition-colors">Transfers</Link></li>
              <li><a href="#how" className="hover:text-primary-400 transition-colors">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About</Link></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Legal & Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms-of-service" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© 2026 Hapex Banking. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
