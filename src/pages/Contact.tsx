import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:bg-white/30 transition-all">
              <i className="fas fa-arrow-left text-sm" />
            </div>
          </Link>
          <img src="/storage/app/public/photos/FfZWxYEREMC8mqEkVUAlWHyFmDRlJTFVPlyT5EYx.png" alt="Hapex" className="h-8" />
        </div>
      </div>

      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-black mb-3">Get in Touch</h1>
        <p className="text-white/80 max-w-xl mx-auto">Our support team is available 24/7 to help with any questions or issues.</p>
      </section>

      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Send us a message</h2>
            <form onSubmit={e => { e.preventDefault(); alert('Message sent! We will get back to you within 24 hours.') }} className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text', icon: 'fa-user', placeholder: 'John Doe' },
                { key: 'email', label: 'Email Address', type: 'email', icon: 'fa-envelope', placeholder: 'john@example.com' },
                { key: 'subject', label: 'Subject', type: 'text', icon: 'fa-tag', placeholder: 'How can we help?' },
              ].map(f => (
                <div key={f.key} className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">{f.label}</label>
                  <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 text-sm">
                      <i className={`fas ${f.icon}`} />
                    </div>
                    <input type={f.type} placeholder={f.placeholder} required
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm" />
                  </div>
                </div>
              ))}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Message</label>
                <textarea rows={4} placeholder="Tell us more..." required
                  className="w-full px-3 py-2.5 border border-gray-300/50 dark:border-gray-600/50 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm resize-none" />
              </div>
              <button type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2">
                <i className="fas fa-paper-plane" /> Send Message
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: 'fa-envelope', title: 'Email Support', lines: ['support@hapexbank.com', 'Available 24/7'], color: 'from-blue-500 to-blue-700' },
              { icon: 'fa-phone', title: 'Phone Support', lines: ['+1 (800) 427-3924', 'Mon–Fri 8am–8pm EST'], color: 'from-green-500 to-green-700' },
              { icon: 'fa-map-marker-alt', title: 'Headquarters', lines: ['One Hapex Plaza, 34th Floor', 'New York, NY 10001, USA'], color: 'from-orange-500 to-orange-700' },
              { icon: 'fa-comments', title: 'Live Chat', lines: ['Available on the app', 'Average response: 2 minutes'], color: 'from-purple-500 to-purple-700' },
            ].map(c => (
              <div key={c.title} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white flex-shrink-0`}>
                  <i className={`fas ${c.icon}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{c.title}</p>
                  {c.lines.map((l, i) => <p key={i} className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{l}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-6 bg-gray-900 text-center text-sm text-gray-400">
        <p>© 2026 Hapex Banking. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
