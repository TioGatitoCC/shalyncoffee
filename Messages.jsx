import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { IconMessage, IconBack } from '../components/Icons.jsx'

export default function Messages() {
  const [anuncios, setAnuncios] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    loadAnuncios()
  }, [])

  async function loadAnuncios() {
    const { data } = await supabase.from('anuncios').select('*').order('fecha', { ascending: false })
    setAnuncios(data || [])
  }

  function formatFecha(fecha) {
    return new Date(fecha).toLocaleString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  }

  if (selected) {
    return (
      <div className="screen">
        <div className="detail-header">
          <button className="back-btn" onClick={() => setSelected(null)}>
            <IconBack width="20" height="20" />
          </button>
          <div className="chat-avatar" style={{ width: 38, height: 38, fontSize: 13 }}>SC</div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--brown-dark)', fontSize: 14 }}>Shalyn Coffee</div>
            <div className="small">{formatFecha(selected.fecha)}</div>
          </div>
        </div>
        <div className="announce-card">
          <div style={{ fontSize: 14, lineHeight: 1.5 }}>{selected.texto}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1>Avisos</h1>
      <p className="sub">Promociones y anuncios de Shalyn Coffee.</p>
      {anuncios.length === 0 ? (
        <div className="empty-state">
          <IconMessage />
          <div>No hay avisos por ahora.</div>
        </div>
      ) : (
        anuncios.map((a) => (
          <div className="chat-row" key={a.id} onClick={() => setSelected(a)}>
            <div className="chat-avatar">SC</div>
            <div className="chat-info">
              <div className="chat-toprow">
                <span className="chat-name">Shalyn Coffee</span>
                <span className="chat-date">{formatFecha(a.fecha)}</span>
              </div>
              <div className="chat-preview">{a.texto}</div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
