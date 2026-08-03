import { Link } from 'react-router-dom'

export default function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly (name, email, phone, address), information generated through use of our services (transactions, account activity, device data), and information from third parties where permitted by law.',
    },
    {
      title: 'How We Use Your Information',
      content: 'We use your information to provide and improve our services, process transactions, prevent fraud, comply with legal obligations, communicate with you about your account, and send relevant marketing communications (with your consent).',
    },
    {
      title: 'Data Sharing',
      content: 'We do not sell your personal data. We share data only with regulated financial partners required to process your transactions, service providers bound by confidentiality agreements, and regulatory authorities when required by law.',
    },
    {
      title: 'Data Security',
      content: 'Your data is protected by 256-bit AES encryption at rest and in transit. We employ multi-factor authentication, intrusion detection systems, and regular third-party security audits. Our systems are ISO 27001 certified.',
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal data at any time. You may also request data portability, restrict processing, or object to certain uses. Contact our privacy team at privacy@hapexbank.com.',
    },
    {
      title: 'Cookies',
      content: 'We use strictly necessary cookies to operate the service and optional analytics cookies (with your consent) to improve performance. You can manage cookie preferences in your browser settings at any time.',
    },
    {
      title: 'Data Retention',
      content: 'We retain your data for as long as your account is active or as required by financial regulations. Upon account closure, most personal data is deleted within 90 days, except where retention is required by law (typically 7 years for financial records).',
    },
    {
      title: 'Contact Us',
      content: 'For privacy-related enquiries contact: privacy@hapexbank.com or write to Hapex Banking, One Hapex Plaza, New York, NY 10001. Our Data Protection Officer can be reached at dpo@hapexbank.com.',
    },
  ]

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
        <h1 className="text-4xl font-black mb-3">Privacy Policy</h1>
        <p className="text-white/80">Last updated: January 1, 2026</p>
      </section>

      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/50 rounded-2xl p-5 text-sm text-primary-700 dark:text-primary-300">
            <i className="fas fa-shield-alt mr-2" />
            Hapex is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
          </div>
          {sections.map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                {s.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-6 bg-gray-900 text-center text-sm text-gray-400">
        <p>© 2026 Hapex Banking. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
