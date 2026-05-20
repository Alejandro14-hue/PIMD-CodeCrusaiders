import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './AppLayout.css'

const FIELD_LABELS = {
  precision_diagnostica: 'Precisión diagnóstica',
  claridad_textual: 'Claridad textual',
  relevancia_clinica: 'Relevancia clínica',
  adecuacion_contextual: 'Adecuación contextual',
  nivel_tecnico_adecuado: 'Nivel técnico adecuado',
};

async function fetchAndGeneratePDF() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/v1/valoraciones/', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { data } = await res.json();

  const doc = new jsPDF({ orientation: 'landscape' });
  const now = new Date().toLocaleDateString('es-ES');

  doc.setFontSize(16);
  doc.text('Resultados de Valoraciones — Code Crusaders', 14, 16);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generado el ${now} · Total: ${data.length} valoraciones`, 14, 23);
  doc.setTextColor(0);

  autoTable(doc, {
    startY: 28,
    head: [['Caso ID', 'Usuario', 'Precisión diag.', 'Claridad text.', 'Relevancia clín.', 'Adecuación cont.', 'Nivel técnico', 'Media', 'Comentario', 'Fecha']],
    body: data.map((v) => {
      const scores = Object.keys(FIELD_LABELS).map(k => v[k] ?? '-');
      const nums = scores.filter(s => typeof s === 'number');
      const avg = nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1) : '-';
      const fecha = v.fecha ? new Date(v.fecha).toLocaleDateString('es-ES') : '-';
      return [v.caso_id, v.user_id, ...scores, avg, v.comentario || '', fecha];
    }),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [0, 123, 255], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    columnStyles: { 8: { cellWidth: 40 } },
  });

  doc.save(`valoraciones_${now.replace(/\//g, '-')}.pdf`);
}

function AppLayout({ sidebar, children, user, onLogout }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await fetchAndGeneratePDF();
    } catch (e) {
      alert(`Error al generar el PDF: ${e.message}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">
        <div className="app-layout__sidebar-header">
          <span className="app-layout__logo">🏥</span>
          <span className="app-layout__brand">Code Crusaders</span>
        </div>
        {sidebar}
      </aside>
      <div className="app-layout__right">
        <header className="app-layout__topbar">
          <div className="app-layout__topbar-left">
            <button
              className="app-layout__download"
              type="button"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? 'Generando...' : 'Descargar Resultados'}
            </button>
          </div>
          <div className="app-layout__topbar-right">
            <span className="app-layout__user">
              {user?.name || user?.email}
            </span>
            <button className="app-layout__logout" onClick={onLogout} type="button">
              Cerrar sesión
            </button>
          </div>
        </header>
        <main className="app-layout__main">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout
