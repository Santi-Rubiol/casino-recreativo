import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '1rem',
        backgroundColor: 'red',
        height: '10vh',
      }}
    >
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', left: '1rem' }}
      >
        VOLVER AL MENÚ
      </button>

      <h1 style={{ margin: 0 }}>JUEGO</h1>
    </header>
  )
}

export default Header
