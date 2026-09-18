import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from './supabaseClient.js'
import WelcomeModal from './components/WelcomeModal.jsx'
import { IconHome, IconMessage, IconLogout } from './components/Icons.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ClientCard from './pages/ClientCard.jsx'
import Messages from './pages/Messages.jsx'
import EmployeePanel from './pages/EmployeePanel.jsx'

export default function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accepted, setAccepted] = useState(() => sessionStorage.getItem('shalyn_accepted') === 'true')
  const [tab, setTab] = useState('home')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) loadProfile(session.user.id)
      else setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) loadProfile(session.user.id)
      else {
        setProfile(null)
        setLoading(false)
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  async function loadProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data)
    setLoading(false)
  }

  function acceptTerms() {
    sessionStorage.setItem('shalyn_accepted', 'true')
    setAccepted(true)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setTab('home')
    navigate('/login')
  }

  if (loading) {
    return <div className="loading-center">Cargando…</div>
  }

  if (!accepted) {
    return (
      <div className="app-shell">
        <WelcomeModal onAccept={acceptTerms} />
      </div>
    )
  }

  const loggedIn = !!session && !!profile

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div className="brand">Shalyn Coffee</div>
          <div className="tag">Tarjeta de sellos</div>
        </div>
        {loggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            <IconLogout width="13" height="13" /> Salir
          </button>
        )}
      </div>

      <div className="content">
        <Routes>
          <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/registro" element={loggedIn ? <Navigate to="/" /> : <Register />} />
          <Route
            path="/"
            element={
              !loggedIn ? (
                <Navigate to="/login" />
              ) : profile.is_staff ? (
                <EmployeePanel tab={tab} />
              ) : tab === 'home' ? (
                <ClientCard profile={profile} />
              ) : (
                <Messages />
              )
            }
          />
        </Routes>
      </div>

      {loggedIn && (
        <div className="bottomnav">
          <button className={`navbtn ${tab === 'home' ? 'active' : ''}`} onClick={() => setTab('home')}>
            <IconHome />
            Inicio
          </button>
          <button className={`navbtn ${tab === 'messages' ? 'active' : ''}`} onClick={() => setTab('messages')}>
            <IconMessage />
            Avisos
          </button>
        </div>
      )}
    </div>
  )
}
