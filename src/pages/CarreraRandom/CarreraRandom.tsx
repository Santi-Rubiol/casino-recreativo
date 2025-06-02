// RandomRaceGame.tsx
import React, { useState, useEffect, useRef } from 'react'
import type { Competitor } from './Carrera'

const competitors: Competitor[] = [
  { id: 1, name: 'Tortuga', emoji: '🐢' },
  { id: 2, name: 'Liebre', emoji: '🐇' },
  { id: 3, name: 'Perro', emoji: '🐶' },
]

const RandomRaceGame: React.FC = () => {
  const [positions, setPositions] = useState<number[]>(
    Array(competitors.length).fill(0)
  )
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [winner, setWinner] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const finishLine = 90 // in percentage

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setPositions((prev) => {
          const newPositions = prev.map((pos) => {
            if (pos >= finishLine) return pos
            const increment = Math.random() * 5
            return Math.min(pos + increment, finishLine)
          })

          const winnerIndex = newPositions.findIndex((pos) => pos >= finishLine)
          if (winnerIndex !== -1 && !winner) {
            setIsRunning(false)
            if (intervalRef.current) clearInterval(intervalRef.current)
            setWinner(competitors[winnerIndex].name)
          }

          return newPositions
        })
      }, 100)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, winner])

  const startRace = () => {
    setPositions(Array(competitors.length).fill(0))
    setWinner(null)
    setIsRunning(true)
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>🏁 Carrera Aleatoria</h1>
      <button
        onClick={startRace}
        disabled={isRunning}
      >
        {isRunning ? 'Corriendo...' : 'Iniciar Carrera'}
      </button>

      <div style={{ marginTop: '30px' }}>
        {competitors.map((competitor, index) => (
          <div
            key={competitor.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>
              {competitor.emoji}
            </span>
            <div
              style={{
                height: '20px',
                background: 'lightgray',
                width: '100%',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'green',
                  width: `${positions[index]}%`,
                  transition: 'width 0.1s ease-in-out',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {winner && <h2>🎉 ¡Ganó {winner}!</h2>}
    </div>
  )
}

export default RandomRaceGame
