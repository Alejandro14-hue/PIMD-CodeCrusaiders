import './CaseFieldsList.css'

const SECTIONS = [
  {
    title: '🩺 Datos del Paciente',
    fields: ['edad', 'sexo', 'alergias', 'factores_sociales'],
  },
  {
    title: '📚 Antecedentes',
    fields: ['antecedentes_medicos', 'antecedentes_quirurgicos', 'antecedentes_familiares'],
  },
  {
    title: '🧬 Situación Clínica',
    fields: ['habitos', 'situacion_basal', 'medicacion_actual', 'motivo', 'sintomas'],
  },
  {
    title: '🔍 Exploración y Pruebas',
    fields: ['exploracion_general', 'signos', 'resultados_pruebas'],
  },
  {
    title: '🧠 Juicio Clínico',
    fields: ['razonamiento_clinico', 'diagnostico_final'],
  },
  {
    title: '💊 Tratamiento',
    fields: ['tratamiento_farmacologico', 'tratamiento_no_farmacologico'],
  },
  {
    title: '📖 Información Adicional',
    fields: ['referencias_bibliograficas', 'categoria', 'keywords', 'codigo_cie_10'],
  },
]

const LABEL_MAP = {
  edad: 'Edad',
  sexo: 'Sexo',
  alergias: 'Alergias',
  factores_sociales: 'Factores sociales',
  antecedentes_medicos: 'Antecedentes médicos',
  antecedentes_quirurgicos: 'Antecedentes quirúrgicos',
  antecedentes_familiares: 'Antecedentes familiares',
  habitos: 'Hábitos',
  situacion_basal: 'Situación basal',
  medicacion_actual: 'Medicación actual',
  motivo: 'Motivo de consulta',
  sintomas: 'Síntomas',
  exploracion_general: 'Exploración general',
  signos: 'Signos',
  resultados_pruebas: 'Resultados de pruebas',
  razonamiento_clinico: 'Razonamiento clínico',
  diagnostico_final: 'Diagnóstico final',
  tratamiento_farmacologico: 'Tratamiento farmacológico',
  tratamiento_no_farmacologico: 'Tratamiento no farmacológico',
  referencias_bibliograficas: 'Referencias bibliográficas',
  categoria: 'Categoría',
  keywords: 'Keywords',
  codigo_cie_10: 'Código CIE-10',
}

function CaseFieldsList({ caso }) {
  if (!caso) return null

  return (
    <div className="case-fields-list">
      {SECTIONS.map((section) => {
        const visibleFields = section.fields.filter(
          (key) => caso[key] !== undefined && caso[key] !== null && caso[key] !== ''
        )
        if (visibleFields.length === 0) return null

        return (
          <div key={section.title} className="case-fields-list__section">
            <h3 className="case-fields-list__section-title">{section.title}</h3>
            {visibleFields.map((key) => (
              <div key={key} className="case-fields-list__row">
                <p className="case-fields-list__label">{LABEL_MAP[key] ?? key}</p>
                <p className="case-fields-list__value">{String(caso[key])}</p>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default CaseFieldsList
