import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { IconPhone, IconClose, IconGift } from '../components/Icons.jsx'
import CupIcon from '../components/CupIcon.jsx'

const TOTAL = 10
const CUP_COLORS = ["#D96C6C","#E0A23A","#D4AF37","#7AA86B","#5E8A9A","#B4D4E0","#8C6FB0","#C77F9E","#5C3A21","#3E2716"]

export default function ClientCard({ profile }) {
  const [historial, setHistorial] = useState([])
  const [showPwaTip, setShowPwaTip] = useState(true)

  useEffect(() => {
    setShowPwaTip(true) // reaparece cada vez que se entra a esta pantalla
    loadHistorial()
  }, [])

  async function loadHistorial() {
    const { data } = await supabase
      .from('historial')
      .select('*')
      .eq('profile_id', profile.id)
      .order('fecha', { ascending: false })
    setHistorial(data || [])
  }

  const sellos = profile.sellos

  return (
    <div className="screen">
      <h1>Hola, {profile.nombre}</h1>
      <p className="sub">Tu tarjeta de sellos</p>

      {showPwaTip && (
        <div className="pwa-tip">
          <IconPhone width="20" height="20" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <b>Agrega Shalyn Coffee a tu pantalla de inicio</b>
            Android: menú del navegador → "Instalar app". iPhone: compartir → "Agregar a pantalla de inicio".
          </div>
          <button onClick={() => setShowPwaTip(false)}>
            <IconClose width="16" height="16" />
          </button>
        </div>
      )}

      {sellos >= TOTAL && (
        <div className="reward-banner">
          <IconGift width="20" height="20" />
          ¡Ya ganaste tu frappe gratis! Muestra tu código en la caja.
        </div>
      )}

      <div className="progress-label">
        <span>{sellos} de {TOTAL} sellos</span>
        <span>Meta: frappe gratis</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${Math.min(100, (sellos / TOTAL) * 100)}%` }} />
      </div>

      <div className="cupgrid">
        {Array.from({ length: TOTAL }).map((_, i) => {
          const won = i < sellos
          return (
            <div className="cup" key={i}>
              <CupIcon color={won ? CUP_COLORS[i] : undefined} empty={!won} />
            </div>
          )
        })}
      </div>

      <div className="code-box">
        <div className="lbl">Tu código</div>
        <div className="code">{profile.codigo}</div>
        <div className="qrbox">
          {/* Aquí se puede integrar una librería de generación real de QR (ej. qrcode.react) usando profile.codigo */}
          <span style={{ fontSize: 10, color: '#999' }}>QR: {profile.codigo}</span>
        </div>
      </div>
      <p className="small center">Muéstraselo al barista para tu sello.</p>

      <div className="card">
        <div className="row"><b>Historial de recompensas</b></div>
        <div className="small">
          {historial.length === 0 ? (
            'Aún no has canjeado ninguna recompensa.'
          ) : (
            <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
              {historial.map((h) => (
                <li key={h.id}>{h.descripcion} — {new Date(h.fecha).toLocaleDateString('es-MX')}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
