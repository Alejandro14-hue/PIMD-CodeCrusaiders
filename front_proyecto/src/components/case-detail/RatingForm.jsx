import React, { useState } from 'react';
import './RatingForm.css';

const RATING_FIELDS = [
  'Precisión diagnóstica',
  'Claridad textual',
  'Relevancia clínica',
  'Adecuación contextual',
  'Nivel técnico adecuado'
];

function RatingForm({ caseId }) {
  const [ratings, setRatings] = useState(
    RATING_FIELDS.reduce((acc, field) => ({ ...acc, [field]: 5 }), {})
  );

  const handleChange = (field, value) => {
    setRatings(prev => ({
      ...prev,
      [field]: parseInt(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending ratings for case:', caseId, ratings);
    alert('Calificación enviada (Simulado): ' + JSON.stringify(ratings, null, 2));
  };

  return (
    <div className="rating-form">
      <h3 className="rating-form__title">Valoración del Caso</h3>
      <form onSubmit={handleSubmit} className="rating-form__container">
        {RATING_FIELDS.map((field) => (
          <div key={field} className="rating-form__field">
            <label className="rating-form__label">{field}</label>
            <select
              className="rating-form__select"
              value={ratings[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit" className="rating-form__button">
          Calificar
        </button>
      </form>
    </div>
  );
}

export default RatingForm;
