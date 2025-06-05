import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { leerJugadoresStorage } from '../data/registroJugadores'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import Header from './Header'
import Footer from './Footer'
import type { Jugador } from '../types/Types'

const GameEstructure = ({
  MainContent,
}: {
  MainContent: React.ComponentType<{
    jugadores: Jugador[]
    setJugadores: Dispatch<SetStateAction<Jugador[]>>
  }>
}) => {
  const [jugadores, setJugadores] = useState<Jugador[]>(() =>
    leerJugadoresStorage()
  )

  return (
    <>
      <Header />
      <div
        style={{ display: 'flex', justifyContent: 'center', height: '75vh' }}
      >
        <div style={{ width: '40vw' }}>
          <Leaderboard jugadores={jugadores} />
        </div>
        <div style={{ width: '60vw' }}>
          <MainContent
            jugadores={jugadores}
            setJugadores={setJugadores}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default GameEstructure
