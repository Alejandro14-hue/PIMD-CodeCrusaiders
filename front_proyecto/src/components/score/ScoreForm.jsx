import { SCORE_FIELDS } from '../../constants/scoreFields'
import './ScoreForm.css'

function ScoreForm({ scores, onChange, onSubmit, disabled }) {
  return (
    <form className="score-form" onSubmit={onSubmit}>
      <h3 className="score-form__title">Evaluacion del caso</h3>

      <div className="score-form__fields">
        {SCORE_FIELDS.map((field) => (
          <label key={field} className="score-form__field">
            <span>{field}</span>
            <select value={scores[field] ?? ''} onChange={(event) => onChange(field, event.target.value)}>
              <option value="">Selecciona</option>
              {[1, 2, 3, 4, 5].map((score) => (
                <option key={score} value={score}>
                  {score}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <button type="submit" className="score-form__submit" disabled={disabled}>
        Enviar
      </button>
    </form>
  )
}

export default ScoreForm
