import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { caseService } from '../services/caseService';

const CasesContext = createContext(null);

export function CasesProvider({ children }) {
  const { user } = useAuthContext();
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!user) {
        setCases([]);
        setSelectedCaseId(null);
        setSelectedCase(null);
        return;
      }

      try {
        const list = await caseService.getCases();
        if (cancelled) return;
        setCases(list);

        if (list.length > 0) {
          const firstId = String(list[0]._id);
          setSelectedCaseId((prev) => prev ?? firstId);
        }
      } catch {
        if (cancelled) return;
        setCases([]);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    let cancelled = false;

    const loadSelected = async () => {
      if (!user || !selectedCaseId) {
        setSelectedCase(null);
        return;
      }

      try {
        const detail = await caseService.getCaseById(selectedCaseId);
        if (cancelled) return;
        setSelectedCase(detail);
      } catch {
        if (cancelled) return;
        setSelectedCase(null);
      }
    };

    loadSelected();
    return () => {
      cancelled = true;
    };
  }, [user, selectedCaseId]);

  const value = useMemo(
    () => ({ cases, selectedCaseId, setSelectedCaseId, selectedCase }),
    [cases, selectedCaseId, selectedCase]
  );

  return <CasesContext.Provider value={value}>{children}</CasesContext.Provider>;
}

export function useCasesContext() {
  const ctx = useContext(CasesContext);
  if (!ctx) throw new Error('useCasesContext must be used within CasesProvider');
  return ctx;
}
