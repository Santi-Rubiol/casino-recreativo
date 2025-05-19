import { useEffect, useState } from 'react'
import './Dado.css'

type DadoProps = {
  value?: number
  fijo: boolean
  onClick?: () => void
}

const Dado = ({ value, fijo, onClick }: DadoProps) => {
  const [displayValue, setDisplayValue] = useState<number | string>('?')
  const [isRolling, setIsRolling] = useState(false)

  useEffect(() => {
    if (value !== undefined) {
      setIsRolling(true)

      const interval = setInterval(() => {
        setDisplayValue(Math.ceil(Math.random() * 6))
      }, 100)

      const timeout = setTimeout(() => {
        clearInterval(interval)
        setDisplayValue(value)
        setIsRolling(false)
      }, 600)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [value])

  return (
    <div
      className={`dado ${isRolling ? 'rolling' : ''} ${fijo ? 'fijo' : ''}`}
      onClick={onClick}
    >
      {displayValue}
    </div>
  )
}

export default Dado
