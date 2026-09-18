import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient.js'
import { IconAlert, IconMail } from '../components/Icons.jsx'

export default function Register() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    if (!nombre || !email || !password) {
      setError('Completa todos los campos para continuar.')
      return
    }
    if (!email.includes('@')) {
      setError('Escribe un correo válido.')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    setLoading(true)
    // Generamos un código único para el cliente
    const codigo = 'SC' + Math.floor(1000 + Math.random() * 9000)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre, codigo } },
    })
    setLoading(false)

    if (signUpError) {
      setError(signUpError.message === 'User already registered'
        ? 'Ya existe una cuenta con ese correo. Intenta iniciar sesión.'
        : 'Ocurrió un error al crear tu cuenta. Intenta de nuevo.')
      return
    }

    // Creamos el perfil en la tabla profiles (se completará al confirmar el correo,
    // pero lo dejamos preparado con un trigger en Supabase — ver documentación del proyecto)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="screen verify-box">
        <IconMail className="icon-lg" />
        <h1>Revisa tu correo</h1>
        <p className="sub">
          Te enviamos un enlace de verificación a <b>{email}</b>. Ábrelo desde tu celular o
          computadora para activar tu cuenta.
        </p>
        <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Ya verifiqué, ir a iniciar sesión
        </Link>
      </div>
    )
  }

  return (
    <div className="screen">
      <h1>Crea tu cuenta</h1>
      <p className="sub">Regístrate para empezar a juntar sellos.</p>
      <form onSubmit={handleRegister}>
        <label>Nombre de usuario</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Ana, Toño, la de las trenzas" />
        <label>Correo</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Crea una contraseña" />
        {error && (
          <div className="error-text">
            <IconAlert width="13" height="13" style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{error}</span>
          </div>
        )}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>
      <Link to="/login" className="link">¿Ya tienes cuenta? Inicia sesión</Link>
    </div>
  )
}
