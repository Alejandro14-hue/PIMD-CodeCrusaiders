import { useState, useEffect } from 'react';
import { caseService } from '../services/caseService';

export const useCases = () => {
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await caseService.getCases();
        setCases(data);
      } catch (error) {
        console.error("Error loading cases:", error);
      }
    };
    fetchCases();
  }, []);

  const selectedCase = cases.find(c => c.id === selectedCaseId);

  return { cases, selectedCaseId, setSelectedCaseId, selectedCase, details };
};
