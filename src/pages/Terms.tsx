import { Link } from 'react-router-dom'

export default function Terms() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By opening a Hapex account or using our services, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any part of these terms, you must not use our services.',
    },
    {
      title: 'Eligibility',
      content: 'You must be at least 18 years of age and a legal resident of a supported country to open a Hapex account. By registering, you confirm that all information provided is accurate and complete.',
    },
    {
      title: 'Account Responsibilities',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.',
    },
    {
      title: 'Permitted Uses',
      content: 'Hapex accounts may only be used for lawful purposes. You may not use our services for money laundering, fraud, terrorist financing, or any activity that violates applicable laws and regulations.',
    },
    {
      title: 'Fees and Charges',
      content: 'All applicable fees will be disclosed to you before transactions are processed. We reserve the right to update our fee schedule with 30 days notice. Continued use of the service constitutes acceptance of updated fees.',
    },
    {
      title: 'Transaction Limits',
      content: 'Accounts are subject to daily and monthly transaction limits based on your account tier and verification status. Limits may be adjusted as our regulatory obligations require.',
    },
    {
      title: 'Account Termination',
      content: 'Either party may terminate this agreement at any time. Hapex reserves the right to suspend or close accounts engaged in suspicious activity, fraud, or violations of these terms, with or without prior notice where law permits.',
    },
    {
      title: 'Limitation of Liability',
      content: 'Hapex shall not be liable for indirect, incidental, or consequential damages arising from use of our services. Our liability is limited to direct damages not exceeding the fees paid in the prior 12 months.',
    },
    {
      title: 'Governing Law',
      content: 'These terms are governed by the laws of the State of New York, USA, without regard to conflict of law provisions. Disputes shall be resolved through binding arbitration in New York, NY.',
    },
    {
      title: 'Changes to Terms',
      content: 'We may update these terms at any time. We will provide 30 days advance notice of material changes via email or in-app notification. Continued use after the effective date constitutes acceptance.',
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
          <span className="font-bold text-white text-lg">Hapex</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-black mb-3">Terms of Service</h1>
        <p className="text-white/80">Last updated: January 1, 2026</p>
      </section>

      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-2xl p-5 text-sm text-yellow-700 dark:text-yellow-300">
            <i className="fas fa-exclamation-triangle mr-2" />
            Please read these terms carefully before using Hapex services. These terms constitute a legally binding agreement.
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
