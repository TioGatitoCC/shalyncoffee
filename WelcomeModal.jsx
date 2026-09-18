import { useState } from 'react'
import { IconMail } from './Icons.jsx'

export default function WelcomeModal({ onAccept }) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <svg className="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M8 3v3M12 3v3M16 3v3M5 8h14l-1.2 10.5A2 2 0 0 1 15.8 20H8.2a2 2 0 0 1-2-1.5L5 8Z" />
          <path d="M18.5 10.5H20a2 2 0 0 1 0 4h-1.3" />
        </svg>
        <h2>Bienvenido a Shalyn Coffee</h2>
        <p>Esta tarjeta de sellos digital es un servicio que ofrecemos como cortesía para nuestros clientes.</p>
        <p>En caso de cualquier problema técnico, pérdida de sellos, interrupción del servicio o cierre del sitio, Shalyn Coffee no se hace responsable. Úsalo bajo tu propio criterio.</p>
        <label className="modal-check">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span>He leído y acepto esta condición.</span>
        </label>
        <button className="btn btn-primary" disabled={!checked} onClick={onAccept}>
          Continuar
        </button>
      </div>
    </div>
  )
}
