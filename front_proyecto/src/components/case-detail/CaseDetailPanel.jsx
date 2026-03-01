import CaseFieldsList from './CaseFieldsList'
import './CaseDetailPanel.css'

function CaseDetailPanel({ selectedCase }) {
  if (!selectedCase) {
    return (
      <div className="case-detail-panel__empty">
        <p>Selecciona un caso de la lista para ver su contenido</p>
      </div>
    )
  }

  return (
    <div className="case-detail-panel">
      <h2 className="case-detail-panel__title">
        {selectedCase.motivo || selectedCase.diagnostico_final || 'Caso clínico'}
      </h2>
      <CaseFieldsList caso={selectedCase} />
    </div>
  )
}

export default CaseDetailPanel
