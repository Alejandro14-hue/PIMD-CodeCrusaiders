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

  // cuando cambia el id seleccionado, traemos la información completa del caso
  useEffect(() => {
    if (!selectedCaseId) {
      setDetails(null);
      return;
    }

    const fetchDetails = async () => {
      try {
        const resp = await caseService.getCaseById(selectedCaseId);
        if (resp.ok) {
          setDetails(resp.data);
        } else {
          setDetails(null);
        }
      } catch (err) {
        console.error("Error loading case details:", err);
        setDetails(null);
      }
    };

    fetchDetails();
  }, [selectedCaseId]);

  // preferimos los detalles descargados, si existen, de lo contrario seleccionamos
  // el caso de la lista ya obtenida (esto cubre los escenarios en que la API aleatoria
  // ya contenía todo).
  const selectedCase = details || cases.find(c => String(c._id) === String(selectedCaseId));

  return { cases, selectedCaseId, setSelectedCaseId, selectedCase };
};
