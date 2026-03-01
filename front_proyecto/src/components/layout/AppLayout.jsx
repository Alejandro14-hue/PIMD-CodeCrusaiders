import './AppLayout.css'

function AppLayout({ sidebar, children, user, onLogout }) {
  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">
        <div className="app-layout__sidebar-header">
          <span className="app-layout__logo">🏥</span>
          <span className="app-layout__brand">Code Crusaders</span>
        </div>
        {sidebar}
      </aside>
      <div className="app-layout__right">
        <header className="app-layout__topbar">
          <span className="app-layout__user">
            {user?.name || user?.email}
          </span>
          <button className="app-layout__logout" onClick={onLogout}>
            Cerrar sesión
          </button>
        </header>
        <main className="app-layout__main">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout
