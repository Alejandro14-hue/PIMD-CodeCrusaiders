import { useEffect, useState } from 'react';
import { caseService } from '../../services/caseService';
import './RatingForm.css';

const FIELDS = [
  { key: 'precision_diagnostica',   label: 'Precisión diagnóstica' },
  { key: 'claridad_textual',        label: 'Claridad textual' },
  { key: 'relevancia_clinica',      label: 'Relevancia clínica' },
  { key: 'adecuacion_contextual',   label: 'Adecuación contextual' },
  { key: 'nivel_tecnico_adecuado',  label: 'Nivel técnico adecuado' },
];

const DEFAULT_RATINGS = Object.fromEntries(FIELDS.map(f => [f.key, 5]));

function RatingForm({ caseId }) {
  const [ratings, setRatings] = useState(DEFAULT_RATINGS);
  const [comentario, setComentario] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (!caseId) return;
    setStatus('idle');
    setIsUpdate(false);
    setRatings(DEFAULT_RATINGS);
    setComentario('');

    caseService.getMyRating(caseId).then((existing) => {
      if (existing) {
        setRatings(Object.fromEntries(FIELDS.map(f => [f.key, existing[f.key] ?? 5])));
        setComentario(existing.comentario || '');
        setIsUpdate(true);
      }
    }).catch(() => {});
  }, [caseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await caseService.submitRating({ caso_id: caseId, ...ratings, comentario });
      setStatus('success');
      setIsUpdate(true);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="rating-form">
      <h3 className="rating-form__title">
        {isUpdate ? 'Actualizar valoración' : 'Valoración del Caso'}
      </h3>

      <form onSubmit={handleSubmit} className="rating-form__container">
        {FIELDS.map(({ key, label }) => (
          <div key={key} className="rating-form__field">
            <label className="rating-form__label">{label}</label>
            <select
              className="rating-form__select"
              value={ratings[key]}
              onChange={(e) => setRatings(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="rating-form__field rating-form__field--column">
          <label className="rating-form__label">Comentario (opcional)</label>
          <textarea
            className="rating-form__textarea"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Observaciones sobre el caso..."
            rows={3}
          />
        </div>

        {status === 'success' && (
          <p className="rating-form__feedback rating-form__feedback--ok">
            ✓ Valoración guardada correctamente
          </p>
        )}
        {status === 'error' && (
          <p className="rating-form__feedback rating-form__feedback--error">
            Error al guardar. Inténtalo de nuevo.
          </p>
        )}

        <button
          type="submit"
          className="rating-form__button"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Guardando...' : isUpdate ? 'Actualizar' : 'Calificar'}
        </button>
      </form>
    </div>
  );
}

export default RatingForm;
