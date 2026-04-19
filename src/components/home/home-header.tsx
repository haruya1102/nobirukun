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
    </header>
  )
}
