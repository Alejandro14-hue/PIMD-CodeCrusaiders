import { formatLabel } from '../../utils/formatters'
import './CaseFieldsList.css'

function CaseFieldsList({ fields }) {
  return (
    <section className="case-fields-list">
      {fields.map(([key, value]) => (
        <div key={key} className="case-fields-list__row">
          <p className="case-fields-list__label">{formatLabel(key)}</p>
          <p className="case-fields-list__value">{String(value)}</p>
        </div>
      ))}
    </section>
  )
}

export default CaseFieldsList
