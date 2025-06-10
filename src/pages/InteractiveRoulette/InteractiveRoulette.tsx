import { useState, useEffect } from 'react'
import Roulette from '../../components/Roulette/Roulette'
import Cloth from '../../components/Cloth/Cloth'

type RouletteNumber = {
  value: string
  color: string
}

const rouletteNumbers: RouletteNumber[] = [
  { value: '0', color: 'green' },
  { value: '32', color: 'rgb(255, 0, 0)' },
  { value: '15', color: 'rgb(0, 0, 0)' },
  { value: '19', color: 'rgb(255, 0, 0)' },
  { value: '4', color: 'rgb(0, 0, 0)' },
  { value: '21', color: 'rgb(255, 0, 0)' },
  { value: '2', color: 'rgb(0, 0, 0)' },
  { value: '25', color: 'rgb(255, 0, 0)' },
  { value: '17', color: 'rgb(0, 0, 0)' },
  { value: '34', color: 'rgb(255, 0, 0)' },
  { value: '6', color: 'rgb(0, 0, 0)' },
  { value: '27', color: 'rgb(255, 0, 0)' },
  { value: '13', color: 'rgb(0, 0, 0)' },
  { value: '36', color: 'rgb(255, 0, 0)' },
  { value: '11', color: 'rgb(0, 0, 0)' },
  { value: '30', color: 'rgb(255, 0, 0)' },
  { value: '8', color: 'rgb(0, 0, 0)' },
  { value: '23', color: 'rgb(255, 0, 0)' },
  { value: '10', color: 'rgb(0, 0, 0)' },
  { value: '5', color: 'rgb(255, 0, 0)' },
  { value: '24', color: 'rgb(0, 0, 0)' },
  { value: '16', color: 'rgb(255, 0, 0)' },
  { value: '33', color: 'rgb(0, 0, 0)' },
  { value: '1', color: 'rgb(255, 0, 0)' },
  { value: '20', color: 'rgb(0, 0, 0)' },
  { value: '14', color: 'rgb(255, 0, 0)' },
  { value: '31', color: 'rgb(0, 0, 0)' },
  { value: '9', color: 'rgb(255, 0, 0)' },
  { value: '22', color: 'rgb(0, 0, 0)' },
  { value: '18', color: 'rgb(255, 0, 0)' },
  { value: '29', color: 'rgb(0, 0, 0)' },
  { value: '7', color: 'rgb(255, 0, 0)' },
  { value: '28', color: 'rgb(0, 0, 0)' },
  { value: '12', color: 'rgb(255, 0, 0)' },
  { value: '35', color: 'rgb(0, 0, 0)' },
  { value: '3', color: 'rgb(255, 0, 0)' },
  { value: '26', color: 'rgb(0, 0, 0)' },
]

const generateNumbers = (): RouletteNumber[] => {
  return [...rouletteNumbers].sort(
    (a, b) => parseInt(a.value) - parseInt(b.value)
  )
}

const InteractiveRoulette = () => {
  const [numbersPlayed, setNumbersPlayed] = useState<string[]>([])
  const [winner, setWinner] = useState<string>('')
  const [isRotating, setIsRotating] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [showWinner, setShowWinner] = useState<boolean>(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (!isRotating && winner !== '') {
      setShowWinner(true)
      timeout = setTimeout(() => {
        setShowWinner(false)
        setIsPlaying(false)
      }, 5000)
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isRotating, winner])

  const addNumberToPlay = (number: string) => {
    setNumbersPlayed((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    )
  }

  const numberWinner = (number: string) => {
    setWinner(number)
  }

  const showTextOfWinner = () => {
    const won = numbersPlayed.includes(winner)
    return (
      <div style={{ height: '100px' }}>
        {showWinner && (
          <>
            <h2>¡GANADOR {winner}!</h2>
            <h3>{won ? 'GANASTE' : 'PERDISTE, SEGUÍ PARTICIPANDO'}</h3>
          </>
        )}
      </div>
    )
  }

  return (
    <article className="mainContent row">
      <div className="col-xl-6 col-12">
        <Roulette
          numbersOfRoulette={rouletteNumbers}
          numberWinner={numberWinner}
          setIsRotating={setIsRotating}
          setIsPlaying={setIsPlaying}
        />
      </div>
      <div className="col-xl-6 col-12">
        {showTextOfWinner()}
        <Cloth
          numbers={generateNumbers()}
          addNumberToPlay={addNumberToPlay}
          isPlaying={isPlaying}
        />
      </div>
    </article>
  )
}

export default InteractiveRoulette
