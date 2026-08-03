import { useState } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem('darkMode') === 'true' ||
    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  const toggle = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('darkMode', String(next))
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button
      onClick={toggle}
      className="p-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl transition-all duration-300 hover:scale-110"
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <i className={`fa-solid ${dark ? 'fa-sun' : 'fa-moon'} h-5 w-5`} />
    </button>
  )
}
