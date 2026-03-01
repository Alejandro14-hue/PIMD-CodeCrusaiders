import { useState, useEffect } from 'react';
import { caseService } from '../services/caseService';

export const useCases = () => {
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await caseService.getCases();
        if (response.ok) {
          setCases(response.data);
        }
      } catch (error) {
        console.error("Error loading cases:", error);
      }
    };
    fetchCases();
  }, []);

  const selectedCase = cases.find(c => String(c.id) === String(selectedCaseId));

  return { cases, selectedCaseId, setSelectedCaseId, selectedCase };
};
