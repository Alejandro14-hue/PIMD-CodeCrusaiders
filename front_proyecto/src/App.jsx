import CaseDetailPanel from './components/case-detail/CaseDetailPanel'
import AppLayout from './components/layout/AppLayout'
import ScoreForm from './components/score/ScoreForm'
import CasesSidebar from './components/sidebar/CasesSidebar'
import { useCases } from './hooks/useCases'
import { useCaseScoring } from './hooks/useCaseScoring'
import './App.css'

function App() {
  const { cases, selectedCaseId, setSelectedCaseId, selectedCase, details } = useCases()
  const { selectedScores, handleScoreChange, submitSelectedCaseScore } = useCaseScoring({
    selectedCase,
    selectedCaseId,
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    await submitSelectedCaseScore()
  }

  return (
    <AppLayout
      sidebar={<CasesSidebar cases={cases} selectedCaseId={selectedCaseId} onSelectCase={setSelectedCaseId} />}
    >
      <section className="app-content">
        <CaseDetailPanel selectedCase={selectedCase} details={details} />
        {selectedCase && (
          <ScoreForm
            scores={selectedScores}
            onChange={handleScoreChange}
            onSubmit={handleSubmit}
            disabled={!selectedCase}
          />
        )}
      </section>
    </AppLayout>
  )
}

export default App
