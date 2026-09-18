import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import { IconAlert } from '../components/Icons.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Escribe tu correo y contraseña.')
      return
    }
    setLoading(true)
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (loginError) {
      setError('Correo o contraseña incorrectos, o tu cuenta aún no ha sido verificada.')
      return
    }
    navigate('/')
  }

  return (
    <div className="screen">
      <h1>Inicia sesión</h1>
      <p className="sub">¿Ya tienes cuenta?</p>
      <form onSubmit={handleLogin}>
        <label>Correo</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        {error && (
          <div className="error-text">
            <IconAlert width="13" height="13" style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{error}</span>
          </div>
        )}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
      <Link to="/registro" className="link">¿No tienes cuenta? Regístrate aquí</Link>
    </div>
  )
}
