import { Link } from 'react-router-dom'

export default function About() {
  const team = [
    { name: 'James Thornton', role: 'Chief Executive Officer', initials: 'JT', color: 'from-primary-500 to-primary-700' },
    { name: 'Priya Nair', role: 'Chief Technology Officer', initials: 'PN', color: 'from-purple-500 to-purple-700' },
    { name: 'Marcus Webb', role: 'Chief Financial Officer', initials: 'MW', color: 'from-green-500 to-green-700' },
    { name: 'Sofia Reyes', role: 'Head of Product', initials: 'SR', color: 'from-orange-500 to-orange-700' },
  ]

  const values = [
    { icon: 'fa-shield-alt', title: 'Security First', desc: 'Every decision we make starts with protecting your money and data.' },
    { icon: 'fa-globe', title: 'Global Access', desc: 'Banking should have no borders. We serve 150+ countries worldwide.' },
    { icon: 'fa-bolt', title: 'Speed', desc: 'Instant transfers, real-time notifications, zero unnecessary delays.' },
    { icon: 'fa-handshake', title: 'Transparency', desc: 'No hidden fees, no surprises. Just honest, straightforward banking.' },
    { icon: 'fa-users', title: 'Community', desc: 'We grow when our customers grow. Your success is our success.' },
    { icon: 'fa-leaf', title: 'Sustainability', desc: 'Carbon-neutral operations and responsible business practices.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-all">
              <i className="fas fa-arrow-left text-sm" />
            </div>
          </Link>
          <img src="/storage/app/public/photos/FfZWxYEREMC8mqEkVUAlWHyFmDRlJTFVPlyT5EYx.png" alt="Hapex" className="h-8" />
          <span className="font-bold text-white text-lg">Hapex</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Est. 2020
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Banking reimagined for the modern world</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Hapex was founded with a single mission: make world-class banking accessible to everyone, everywhere, at any time.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '2M+', label: 'Active Customers' },
            { value: '150+', label: 'Countries' },
            { value: '$50B+', label: 'Processed Annually' },
            { value: '4.9★', label: 'App Rating' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-black text-primary-600 dark:text-primary-400">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We believe everyone deserves access to fast, safe, and affordable financial services — regardless of where they live or what they earn.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Since 2020, Hapex has been breaking down the barriers of traditional banking by combining cutting-edge technology with a relentless focus on customer experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
              <i className="fas fa-quote-left text-3xl text-white/30 mb-4" />
              <p className="text-lg font-medium leading-relaxed">
                "We didn't just build a banking app. We built a financial platform that puts the customer at the center of every decision."
              </p>
              <p className="text-sm text-white/70 mt-4">— James Thornton, CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 lg:px-8 bg-white dark:bg-gray-800 border-y border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Our Values</h2>
            <p className="text-gray-500 dark:text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="group bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <i className={`fas ${v.icon} text-lg`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Leadership Team</h2>
            <p className="text-gray-500 dark:text-gray-400">The people driving Hapex forward</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200/50 dark:border-gray-700/50 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>
                  {m.initials}
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{m.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-black mb-3">Ready to join us?</h2>
          <p className="text-white/80 mb-6">Open your account in minutes and experience the future of banking.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/signup" className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">Open Account</Link>
            <Link to="/" className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all">Back to Home</Link>
          </div>
        </div>
      </section>

      <footer className="py-6 bg-gray-900 text-center text-sm text-gray-400">
        <p>© 2026 Hapex Banking. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
