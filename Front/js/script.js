const API_URL = "http://localhost:3000/v1/api/casos/1";

const caseList = document.getElementById("caseList");
const caseDetail = document.getElementById("caseDetail");
const rating = document.getElementById("rating");
const scoreSelect = document.getElementById("scoreSelect");

let casos = [];

/* Mapa de etiquetas visibles */
const fieldLabels = {
  edad: "Edad",
  sexo: "Sexo",
  antecedentes_medicos: "Antecedentes médicos",
  antecedentes_quirurgicos: "Antecedentes quirúrgicos",
  habitos: "Hábitos",
  situacion_basal: "Situación basal",
  medicacion_actual: "Medicación actual",
  antecedentes_familiares: "Antecedentes familiares",
  motivo: "Motivo de consulta",
  sintomas: "Síntomas",
  exploracion_general: "Exploración general",
  signos: "Signos clínicos",
  resultados_pruebas: "Resultados de pruebas",
  razonamiento_clinico: "Razonamiento clínico",
  diagnostico_final: "Diagnóstico final",
  tratamiento_farmacologico: "Tratamiento farmacológico",
  tratamiento_no_farmacologico: "Tratamiento no farmacológico",
  factores_sociales: "Factores sociales",
  alergias: "Alergias",
  referencias_bibliograficas: "Referencias bibliográficas",
  categoria: "Categoría",
  keywords: "Palabras clave",
  codigo_cie_10: "Código CIE-10",
  dificultad: "Nivel de dificultad",
  chunk: "Resumen del caso"
};
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log(  data);

casos = Object.values(data).slice(0, 5);

    renderCaseList();
  })
  .catch(error => {
    console.error("Error al cargar casos:", error);
    caseList.textContent = "No se pudieron cargar los casos";
  });


function renderCaseList() {
  caseList.textContent = "";

  const fragment = document.createDocumentFragment();

  casos.forEach((caso, index) => {
    const div = document.createElement("div");
    div.className = "case-item";

    const title = document.createElement("strong");
    title.textContent = `Caso ${index + 1}`;

    const subtitle = document.createElement("div");
    subtitle.textContent = caso.diagnostico_final || "Sin diagnóstico";

    const noteSpan = document.createElement("span");
    noteSpan.style.marginLeft = "10px";
    noteSpan.style.fontWeight = "bold";
    if (caso.nota) {
      noteSpan.textContent = `(Nota: ${caso.nota})`;
    }

    div.appendChild(title);
    div.appendChild(subtitle);
    div.appendChild(noteSpan);

    div.addEventListener("click", () => showCaseDetail(caso));

    caso._noteSpan = noteSpan;

    fragment.appendChild(div);
  });

  caseList.appendChild(fragment);
}

function showCaseDetail(caso) {
  caseDetail.textContent = "";

  const fragment = document.createDocumentFragment();

  Object.entries(caso).forEach(([key, value]) => {
    if (key === "id" || key === "chunk_id") return;

    const label = fieldLabels[key] || key;

    const field = document.createElement("div");
    field.className = "field";

    const strong = document.createElement("strong");
    strong.textContent = label + ": ";

    const span = document.createElement("span");
    span.textContent = value;

    field.appendChild(strong);
    field.appendChild(span);

    fragment.appendChild(field);
  });

  caseDetail.appendChild(fragment);

  rating.style.display = "flex";
  rating.style.alignItems = "center";
  rating.style.gap = "10px";

  scoreSelect.value = "";

  let btn = document.getElementById("btnPuntuar");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "btnPuntuar";
    btn.textContent = "Puntuar";
    rating.appendChild(btn);
  }

  btn.addEventListener("click", () => {
    const nota = scoreSelect.value;
    if (!nota) {
      alert("Selecciona una nota primero");
      return;
    }

    caso.nota = nota;

    if (caso._noteSpan) {
      caso._noteSpan.textContent = `(Nota: ${nota})`;
    }

    console.log(`Caso ${caso.id} puntado con ${nota}`);
  });
}
