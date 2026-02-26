import { useEffect, useMemo, useState } from 'react'
import { getCases } from '../services/caseService'
import { EXCLUDED_CASE_FIELDS } from '../utils/formatters'

export const useCases = () => {
  const [cases, setCases] = useState([])
  const [selectedCaseId, setSelectedCaseId] = useState('')

  useEffect(() => {
    const fetchCases = async () => {
      const data = await getCases()
      setCases(data)
      setSelectedCaseId(data[0]?.id ?? '')
    }

    fetchCases()
  }, [])

  const selectedCase = useMemo(
    () => cases.find((item) => item.id === selectedCaseId) ?? null,
    [cases, selectedCaseId],
  )

  const details = useMemo(() => {
    if (!selectedCase) return []
    return Object.entries(selectedCase).filter(([key]) => !EXCLUDED_CASE_FIELDS.has(key))
  }, [selectedCase])

  return {
    cases,
    selectedCaseId,
    setSelectedCaseId,
    selectedCase,
    details,
  }
}
