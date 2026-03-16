import CaseFieldsList from './CaseFieldsList'
import RatingForm from './RatingForm'
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
      <div className="case-detail-panel__body">
        <div className="case-detail-panel__fields">
          <CaseFieldsList caso={selectedCase} />
        </div>
        <aside className="case-detail-panel__sidebar">
          <RatingForm caseId={selectedCase._id} />
        </aside>
      </div>
    </div>
  )
}

export default CaseDetailPanel
