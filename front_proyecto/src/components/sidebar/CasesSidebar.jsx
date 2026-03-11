import './CasesSidebar.css'

function CasesSidebar({ cases, selectedCaseId, onSelectCase }) {
  return (
    <nav className="cases-sidebar">
      <h2 className="cases-sidebar__title">Casos clínicos</h2>
      {cases.length === 0 ? (
        <p className="cases-sidebar__empty">No hay casos disponibles</p>
      ) : (
        <ul className="cases-sidebar__list">
          {cases.map((c) => (
            <li
              key={c._id}
              className={`cases-sidebar__item${selectedCaseId === String(c._id) ? ' is-active' : ''}`}
              onClick={() => onSelectCase(String(c._id))}
            >
              {c.motivo || `Caso ${String(c._id)}`}
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default CasesSidebar
