import { useState } from 'react';
import { caseService } from '../services/caseService';

export const useCaseScoring = ({ selectedCase, selectedCaseId }) => {
  const [selectedScores, setSelectedScores] = useState({});

  const handleScoreChange = (field, value) => {
    setSelectedScores(prev => ({ ...prev, [field]: value }));
  };

  const submitSelectedCaseScore = async () => {
    if (!selectedCaseId) return;
    try {
      await caseService.submitCaseScore(selectedCaseId, selectedScores);
      alert("Puntuación enviada con éxito");
      setSelectedScores({});
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  return { selectedScores, handleScoreChange, submitSelectedCaseScore };
};
