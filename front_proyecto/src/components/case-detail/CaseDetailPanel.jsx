import CaseFieldsList from './CaseFieldsList'
import './CaseDetailPanel.css'

function CaseDetailPanel({ selectedCase, details }) {
  if (!selectedCase) {
    return <p className="case-detail-panel__empty">Cargando casos...</p>
  }

  return (
    <section className="case-detail-panel">
      <header className="case-detail-panel__header">
        <h2>{selectedCase.titulo}</h2>
        <p>Detalle completo del caso.</p>
      </header>

      <CaseFieldsList fields={details} />
    </section>
  )
}

export default CaseDetailPanel
