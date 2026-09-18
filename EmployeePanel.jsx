import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient.js'
import { IconCamera, IconTrash, IconMessage } from '../components/Icons.jsx'

const TOTAL = 10

export default function EmployeePanel({ tab }) {
  const [code, setCode] = useState('')
  const [cliente, setCliente] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [toast, setToast] = useState(null)
  const [anuncios, setAnuncios] = useState([])
  const [nuevoAnuncio, setNuevoAnuncio] = useState('')

  useEffect(() => {
    if (tab === 'messages') loadAnuncios()
  }, [tab])

  async function loadAnuncios() {
    const { data } = await supabase.from('anuncios').select('*').order('fecha', { ascending: false })
    setAnuncios(data || [])
  }

  function showToast(msg, gold = true) {
    setToast({ msg, gold })
    setTimeout(() => setToast(null), 2500)
  }

  async function buscarCliente() {
    setNotFound(false)
    setCliente(null)
    const clean = code.trim().toUpperCase()
    const { data, error } = await supabase.from('profiles').select('*').eq('codigo', clean).single()
    if (error || !data) {
      setNotFound(true)
      return
    }
    const { data: hist } = await supabase.from('historial').select('*').eq('profile_id', data.id).order('fecha', { ascending: false })
    setCliente({ ...data, historial: hist || [] })
  }

  async function ponerSello() {
    if (!cliente || cliente.sellos >= TOTAL) return
    const nuevoTotal = cliente.sellos + 1
    const { error } = await supabase.from('profiles').update({ sellos: nuevoTotal }).eq('id', cliente.id)
    if (!error) {
      setCliente({ ...cliente, sellos: nuevoTotal })
      showToast(nuevoTotal >= TOTAL ? 'Sello agregado. Meta alcanzada.' : `Sello agregado (${nuevoTotal} / ${TOTAL}).`)
    }
  }

  async function deshacerSello() {
    if (!cliente || cliente.sellos <= 0) {
      showToast('No hay sellos para deshacer.', false)
      return
    }
    const nuevoTotal = cliente.sellos - 1
    const { error } = await supabase.from('profiles').update({ sellos: nuevoTotal }).eq('id', cliente.id)
    if (!error) {
      setCliente({ ...cliente, sellos: nuevoTotal })
      showToast(`Se deshizo el último sello (${nuevoTotal} / ${TOTAL}).`, false)
    }
  }

  async function canjearRecompensa() {
    if (!cliente) return
    await supabase.from('historial').insert({ profile_id: cliente.id, descripcion: 'Frappe gratis canjeado' })
    const { error } = await supabase.from('profiles').update({ sellos: 0 }).eq('id', cliente.id)
    if (!error) {
      const { data: hist } = await supabase.from('historial').select('*').eq('profile_id', cliente.id).order('fecha', { ascending: false })
      setCliente({ ...cliente, sellos: 0, historial: hist || [] })
      showToast('Recompensa canjeada. Sellos reiniciados a 0.')
    }
  }

  async function publicarAnuncio() {
    const txt = nuevoAnuncio.trim()
    if (!txt) return
    const { error } = await supabase.from('anuncios').insert({ texto: txt })
    if (!error) {
      setNuevoAnuncio('')
      loadAnuncios()
    }
  }

  async function borrarAnuncio(id) {
    await supabase.from('anuncios').delete().eq('id', id)
    loadAnuncios()
  }

  if (tab === 'messages') {
    return (
      <div className="screen">
        <h1>Avisos</h1>
        <p className="sub">Escribe un anuncio para todos tus clientes.</p>
        <textarea rows="3" value={nuevoAnuncio} onChange={(e) => setNuevoAnuncio(e.target.value)} placeholder="Ej. Este viernes 2x1 en frappes de fresa..." />
        <button className="btn btn-primary" onClick={publicarAnuncio}>Publicar aviso</button>

        <div style={{ marginTop: 16 }}>
          {anuncios.length === 0 ? (
            <p className="small center">Aún no has publicado avisos.</p>
          ) : (
            anuncios.map((a) => (
              <div className="chat-row" key={a.id}>
                <div className="chat-avatar">SC</div>
                <div className="chat-info">
                  <div className="chat-toprow">
                    <span className="chat-name">Shalyn Coffee</span>
                    <span className="chat-date">{new Date(a.fecha).toLocaleDateString('es-MX')}</span>
                  </div>
                  <div className="chat-preview">{a.texto}</div>
                  <button className="announce-del" onClick={() => borrarAnuncio(a.id)}>
                    <IconTrash width="12" height="12" /> Borrar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1>Panel de sellado</h1>
      <p className="sub">Busca al cliente por su código o escanea su QR.</p>

      {toast && <div className={`toast ${toast.gold ? 'gold' : ''}`}>{toast.msg}</div>}

      <label>Código del cliente</label>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="SC3921" />
      <div className="center" style={{ margin: '6px 0 14px' }}>
        <span
          className="small"
          style={{ textDecoration: 'underline', cursor: 'pointer', display: 'inline-flex', gap: 5, alignItems: 'center' }}
          onClick={() => alert('Aquí se abriría la cámara para leer el QR fijo del cliente (integración pendiente con una librería de lectura de QR).')}
        >
          <IconCamera width="14" height="14" /> Usar cámara para escanear (opcional)
        </span>
      </div>
      <button className="btn btn-primary" onClick={buscarCliente}>Buscar cliente</button>

      {notFound && (
        <div className="card center" style={{ marginTop: 10 }}>
          <b>Código no encontrado</b>
          <p className="small" style={{ marginTop: 6 }}>Revisa que el código esté bien escrito o pide al cliente que muestre su QR.</p>
        </div>
      )}

      {cliente && (
        <div style={{ marginTop: 16 }}>
          <div className="card">
            <div className="row"><span>Cliente</span><b>{cliente.nombre}</b></div>
            <div className="row"><span>Sellos actuales</span><span className="badge">{cliente.sellos} / {TOTAL}</span></div>
            {cliente.sellos >= TOTAL && (
              <div className="row"><span>Estado</span><span className="badge gold">Recompensa lista</span></div>
            )}
            <div className="small">
              {cliente.historial.length ? `Historial: ${cliente.historial.map(h => h.descripcion).join(' · ')}` : 'Historial: sin canjes previos.'}
            </div>
          </div>
          <button className="btn btn-primary" onClick={ponerSello}>Poner sello</button>
          <button className="btn btn-ghost" onClick={deshacerSello}>Deshacer último sello</button>
          {cliente.sellos >= TOTAL && (
            <button className="btn btn-gold" onClick={canjearRecompensa}>Canjear recompensa</button>
          )}
        </div>
      )}
    </div>
  )
}
