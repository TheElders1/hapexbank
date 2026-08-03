import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Default to dark mode; only override if user has explicitly chosen light
if (localStorage.getItem('darkMode') !== 'false') {
  document.documentElement.classList.add('dark')
  if (!localStorage.getItem('darkMode')) localStorage.setItem('darkMode', 'true')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
