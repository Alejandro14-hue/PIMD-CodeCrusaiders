export const EXCLUDED_CASE_FIELDS = new Set([
  'chunk_id', 
  'chunk', 
  '_id', 
  'id', 
  'Precisión diagnóstica', 
  'Claridad textual', 
  'Relevancia clínica', 
  'Adecuación contextual', 
  'Nivel técnico adecuado'
])

export const formatLabel = (key) =>
  key
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
