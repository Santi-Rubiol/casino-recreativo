// RandomRaceGame.tsx
import React, { useState, useEffect, useRef } from 'react'
import Leaderboard from '../../components/Leaderboard/Leaderboard'
import {
  leerJugadoresStorage,
  actualizarPuntajeYPosiciones,
} from '../../data/registroJugadores'
import type { Jugador } from '../../types/Types'
import type { Corredor } from './Carrera'

const RandomRaceGame: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [winner, setWinner] = useState<string | null>(null)
  const intervalRef = useRef<number | null>(null)
  const jugadores: Jugador[] = leerJugadoresStorage()
  const finishLine = 90 // in percentage
  const [corredores, setCorredores] = useState<Corredor[]>(
    jugadores.map(
      (jugador): Corredor => ({
        id: jugador.id, // ⚠️ Esto da error si `jugador.id` es string
        jugador: jugador,
        emoji: jugador.nombre,
      })
    )
  )
  const [positions, setPositions] = useState<number[]>(
    Array(corredores.length).fill(0)
  )
  const EMOJIS = ['🏎️', '🚗', '🚕', '🚙', '🚓', '🚑', '🚒', '🏍️', '🛵']

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setPositions((prev) => {
          const newPositions = prev.map((pos) => {
            if (pos >= finishLine) return pos
            const increment = Math.random() * 2.5 // más lento
            return Math.min(pos + increment, finishLine)
          })

          const winnerIndex = newPositions.findIndex((pos) => pos >= finishLine)
          if (winnerIndex !== -1 && !winner) {
            setIsRunning(false)
            if (intervalRef.current !== null) clearInterval(intervalRef.current)
            const jugadorGanador = corredores[winnerIndex].jugador
            setWinner(jugadorGanador.nombre)
            actualizarPuntajeYPosiciones(jugadores, jugadorGanador.id, 100)
          }

          return newPositions
        })
      }, 100)
    }

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
    }
  }, [isRunning, winner])

  const startRace = () => {
    setPositions(Array(corredores.length).fill(0))
    setWinner(null)
    setIsRunning(true)
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <Leaderboard jugadores={jugadores} />
      <h1>🏁 Carrera Aleatoria</h1>
      {corredores.map((corredor, index) => (
        <div
          key={corredor.id}
          style={{ marginBottom: '1rem' }}
        >
          <label>
            {corredor.jugador.nombre}:
            <select
              value={corredor.emoji ?? ''}
              onChange={(e) => {
                const nuevos = [...corredores]
                nuevos[index].emoji = e.target.value
                setCorredores(nuevos)
              }}
            >
              <option value="">Seleccionar emoji</option>
              {EMOJIS.map((emoji) => (
                <option
                  key={emoji}
                  value={emoji}
                >
                  {emoji}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}

      <button
        onClick={startRace}
        disabled={isRunning}
      >
        {isRunning ? 'Corriendo...' : 'Iniciar Carrera'}
      </button>

      <div
        style={{
          marginTop: '30px',
          position: 'relative',
          height: `${corredores.length * 50}px`,
          border: '2px solid black',
          padding: '10px',
        }}
      >
        {corredores.map((competitor, index) => (
          <div
            key={competitor.id}
            style={{
              position: 'absolute',
              top: `${index * 50}px`,
              left: `${positions[index]}%`,
              fontSize: '2rem',
              transition: 'left 0.1s ease-in-out',
            }}
          >
            {competitor.emoji}
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '90%',
            width: '2px',
            backgroundColor: 'red',
          }}
        ></div>
      </div>

      {winner && <h2>🎉 ¡Ganó {winner}!</h2>}
    </div>
  )
}

export default RandomRaceGame
