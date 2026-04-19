export function HomeHeader() {
  return (
    <header
      className="flex justify-between items-center px-6 py-4 w-full fixed top-0 z-40 max-w-md"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div
        className="font-extrabold text-2xl font-headline tracking-tight"
        style={{ color: 'var(--primary)' }}
      >
        のびるクン
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold" style={{ color: 'var(--secondary)' }}>
          今日もおつかれさま
        </span>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{
            backgroundColor: 'var(--primary-fixed)',
            border: '2px solid white',
            boxShadow: '0 4px 10px -4px rgba(61, 50, 38, 0.1)',
          }}
        >
          🌿
        </div>
      </div>
    </header>
  )
}
