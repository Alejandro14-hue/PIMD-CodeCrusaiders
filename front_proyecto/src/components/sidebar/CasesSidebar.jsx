import './CasesSidebar.css'

function CasesSidebar({ cases, selectedCaseId, onSelectCase }) {
  return (
    <div className="cases-sidebar">
      <h1 className="cases-sidebar__title">Casos</h1>
      <p className="cases-sidebar__hint">Selecciona un caso para revisar su contenido.</p>

      <div className="cases-sidebar__list">
        {cases.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`cases-sidebar__item ${item.id === selectedCaseId ? 'is-active' : ''}`}
            onClick={() => onSelectCase(item.id)}
          >
            {item.titulo}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CasesSidebar
