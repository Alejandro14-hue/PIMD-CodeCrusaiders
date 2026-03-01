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
              key={c.id}
              className={`cases-sidebar__item${selectedCaseId === c.id ? ' is-active' : ''}`}
              onClick={() => onSelectCase(c.id)}
            >
              {c.motivo || c.diagnostico_final || `Caso ${c.id}`}
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default CasesSidebar
