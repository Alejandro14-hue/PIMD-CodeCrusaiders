export const EXCLUDED_CASE_FIELDS = new Set(['chunk_id', 'chunk'])

export const formatLabel = (key) =>
  key
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
