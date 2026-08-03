export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="loading-container flex flex-col items-center">
        <div className="loading-animation relative w-[120px] h-[120px] mb-8" style={{ filter: 'drop-shadow(0 0 20px rgba(14,165,233,0.2))' }}>
          <div className="absolute inset-0 rounded-full border-2 border-primary-200 animate-spin" style={{ borderTopColor: '#0ea5e9', animationDuration: '2s' }} />
          <div className="absolute inset-[10%] rounded-full border-2 border-primary-200 animate-spin" style={{ borderBottomColor: '#0ea5e9', animationDuration: '2.5s', animationDirection: 'reverse' }} />
          <div className="absolute inset-[20%] rounded-full border-2 border-primary-200 animate-spin" style={{ borderTopColor: '#0ea5e9', animationDuration: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600" style={{ boxShadow: '0 0 20px rgba(14,165,233,0.6)' }} />
        </div>
        <div className="text-lg font-bold tracking-widest bg-gradient-to-r from-primary-500 via-primary-500 to-indigo-600 bg-clip-text text-transparent">Hapex</div>
        <div className="text-xs text-gray-500 mt-1">Secure Banking Platform</div>
      </div>
    </div>
  )
}
