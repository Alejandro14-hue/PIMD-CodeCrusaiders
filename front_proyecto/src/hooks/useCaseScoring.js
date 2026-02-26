import { useMemo, useState } from 'react'
import { submitCaseScore } from '../services/caseService'

export const useCaseScoring = ({ selectedCase, selectedCaseId }) => {
  const [scoresByCase, setScoresByCase] = useState({})

  const selectedScores = useMemo(
    () => scoresByCase[selectedCaseId] ?? {},
    [scoresByCase, selectedCaseId],
  )

  const handleScoreChange = (field, value) => {
    setScoresByCase((prev) => ({
      ...prev,
      [selectedCaseId]: {
        ...prev[selectedCaseId],
        [field]: value,
      },
    }))
  }

  const submitSelectedCaseScore = async () => {
    if (!selectedCase) return

    await submitCaseScore({
      caseId: selectedCase.id,
      scores: selectedScores,
    })
  }

  return {
    selectedScores,
    handleScoreChange,
    submitSelectedCaseScore,
  }
}
