import baseCase from "../../ejemplodatos.json"

const CASES_ENDPOINT = "/api/v1/api/"

const createMockCases = () =>
  Array.from({ length: 5 }, (_, index) => ({
    ...baseCase,
    id: `caso-${index + 1}`,
    titulo: `Caso clinico ${index + 1}`,
  }))

const normalizeCasesResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.cases)) return payload.cases
  if (payload && typeof payload === "object") return [payload]
  return []
}

export const getCases = async () => {
  try {
    const response = await fetch(CASES_ENDPOINT)
    if (!response.ok) {
      throw new Error(`Error cargando casos: ${response.status}`)
    }

    const payload = await response.json()
    const normalizedCases = normalizeCasesResponse(payload)

    return normalizedCases.slice(0, 5).map((item, index) => ({
      ...item,
      id: item.id ?? `caso-${index + 1}`,
      titulo: item.titulo ?? `Caso clinico ${index + 1}`,
    }))
  } catch (error) {
    console.error("Fallo al cargar API, se usa mock local:", error)
    return createMockCases()
  }
}

export const submitCaseScore = async ({ caseId, scores }) => {
  console.log("Payload pendiente de API:", { caseId, scores })
  return { ok: true }
}
