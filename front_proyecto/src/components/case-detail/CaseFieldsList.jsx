import { EXCLUDED_CASE_FIELDS, formatLabel } from '../../utils/formatters'
import './CaseFieldsList.css'

function CaseFieldsList({ caso }) {
  if (!caso) return null

  const fields = Object.entries(caso).filter(([key]) => !EXCLUDED_CASE_FIELDS.has(key))

  return (
    <div className="case-fields-list">
      {fields.map(([key, value]) => (
        <div key={key} className="case-fields-list__row">
          <p className="case-fields-list__label">{formatLabel(key)}</p>
          <p className="case-fields-list__value">{String(value)}</p>
        </div>
      ))}
    </div>
  )
}

export default CaseFieldsList
