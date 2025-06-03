// SlotMachineGame.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const symbols = ['🍒', '🍋', '🔔', '💎', '🍀', '7️⃣']

const getRandomSymbol = () =>
  symbols[Math.floor(Math.random() * symbols.length)]

const TragaMonedas: React.FC = () => {
  const [reels, setReels] = useState<string[]>(['❔', '❔', '❔'])
  const [spinning, setSpinning] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate()

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
  }

  const checkResult = () => {
    const [a, b, c] = reels
    if (a === b && b === c) {
      setMessage('🎉 ¡Ganaste!')
    } else {
      setMessage('😢 Intenta de nuevo')
    }
  }

  return (
    <div
      style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '20px' }}
    >
      <button onClick={() => navigate('/')}>VOLVER AL MENÚ</button>
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
      <button
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? 'Girando...' : 'Girar'}
      </button>
      {message && <h2 style={{ marginTop: '20px' }}>{message}</h2>}
    </div>
  )
}

export default TragaMonedas
