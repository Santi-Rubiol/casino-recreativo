import type { ReactNode } from 'react'
import { leerJugadoresStorage } from '../data/registroJugadores'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import Header from './Header'
import Footer from './Footer'

import type { Jugador } from '../types/Types'

const Estructure = ({ MainContent }: { MainContent: ReactNode }) => {
  const jugadores: Jugador[] = leerJugadoresStorage()

  return (
    <>
      <Header />
      <div
        style={{ display: 'flex', justifyContent: 'center', height: '75vh' }}
      >
        <div style={{ width: '40vw' }}>
          <Leaderboard jugadores={jugadores} />
        </div>
        <div style={{ width: '60vw' }}>{MainContent}</div>
      </div>
      <Footer />
    </>
  )
}

export default Estructure
