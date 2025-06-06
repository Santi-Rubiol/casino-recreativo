import React, { useState } from 'react'
import { actualizarPuntajeYPosiciones } from '../../data/registroJugadores'
import type { JUGADA } from './jugadasPosibles'
import type { Jugador } from '../../types/Types'

const symbols = ['🍒', '🍋', '🔔', '💎', '🍀', '7️⃣']

const getRandomSymbol = () =>
  symbols[Math.floor(Math.random() * symbols.length)]

const TragaMonedas = ({
  jugadores,
  setJugadores,
}: {
  jugadores: Jugador[]
  setJugadores: React.Dispatch<React.SetStateAction<Jugador[]>>
}) => {
  const [reels, setReels] = useState<string[]>(['❔', '❔', '❔'])
  const [spinning, setSpinning] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [tiradas, setTiradas] = useState(3)
  const [jugadaActual, setJugadaActual] = useState<JUGADA | null>(null)
  const [turnoActual, setTurnoActual] = useState<Jugador | null>(
    jugadores[0] ?? null
  )

  const spin = () => {
    setSpinning(true)
    setMessage('')

    let spinCount = 0
    const interval = setInterval(() => {
      setReels([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()])
      spinCount++
      if (spinCount >= 20) {
        clearInterval(interval)
        setSpinning(false)
        checkResult()
      }
    }, 100)
    setTiradas(tiradas - 1)
  }

  const checkResult = () => {
    const [a, b, c] = reels
    if (a === b && b === c) {
      setMessage('🎉 ¡Ganaste!')
    } else {
      setMessage('😢 Intenta de nuevo')
    }
  }

  const finDeTurno = () => {
    if (!jugadores.length || !turnoActual || !jugadaActual) return

    const jugadoresActualizados = actualizarPuntajeYPosiciones(
      jugadores,
      turnoActual.id,
      jugadaActual.valor
    )

    setJugadores(jugadoresActualizados)
    const indexActual = jugadoresActualizados.findIndex(
      (j) => j.id === turnoActual.id
    )
    const indexSiguiente = (indexActual + 1) % jugadoresActualizados.length
    setTurnoActual(jugadoresActualizados[indexSiguiente])
    setTiradas(3)
    setJugadaActual(null)
  }

  return (
    <div
      style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '20px' }}
    >
      <h1>🎰 Tragamonedas</h1>
      <div
        style={{
          fontSize: '3rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          margin: '20px 0',
        }}
      >
        {reels.map((symbol, idx) => (
          <span key={idx}>{symbol}</span>
        ))}
      </div>
      {tiradas > 0 ? (
        <button
          onClick={spin}
          disabled={spinning}
        >
          {spinning ? 'Girando...' : 'Girar'}
        </button>
      ) : null}
      <button onClick={finDeTurno}>SIGUIENTE TURNO</button>
      {message && <h2 style={{ marginTop: '20px' }}>{message}</h2>}
    </div>
  )
}

export default TragaMonedas
