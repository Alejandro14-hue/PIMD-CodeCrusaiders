import './AppLayout.css'

function AppLayout({ sidebar, children }) {
  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">{sidebar}</aside>
      <main className="app-layout__main">{children}</main>
    </div>
  )
}

export default AppLayout
