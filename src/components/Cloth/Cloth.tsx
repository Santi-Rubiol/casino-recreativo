import { useEffect, useState } from 'react'
import './Cloth.css'

type NumberData = {
  value: string
  color: string
}

type NumberInClothProps = {
  number: string
  color: string
  numberToPlay: (number: string) => void
  isPlaying: boolean
  isClear: boolean
}

const NumberInCloth = ({
  number,
  color,
  numberToPlay,
  isPlaying,
  isClear,
}: NumberInClothProps) => {
  const [hover, setHover] = useState(false)
  const [marked, setMarked] = useState(false)

  useEffect(() => {
    setMarked(false)
  }, [isClear])

  const colorOnHover = () => {
    if (color === 'rgb(255, 0, 0)') return 'rgb(255, 70, 70)'
    if (color === 'rgb(0, 0, 0)') return 'rgb(30,30,30)'
    return 'rgb(0,158,0)'
  }

  const onClick = () => {
    if (!isPlaying) {
      setMarked((prev) => !prev)
      numberToPlay(number)
    }
  }

  return (
    <div
      className="numberInCloth"
      style={{ backgroundColor: hover ? colorOnHover() : color }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div className={marked ? 'marked' : 'notMarked'}>{number}</div>
    </div>
  )
}

type NumberRowProps = {
  numbers: NumberData[]
  addNumberToPlay: (number: string) => void
  isPlaying: boolean
  isClear: boolean
}

const NumberRow = ({
  numbers,
  addNumberToPlay,
  isPlaying,
  isClear,
}: NumberRowProps) => {
  return (
    <div className="numbersRowInCloth">
      {numbers.map((number) => (
        <NumberInCloth
          key={number.value}
          number={number.value}
          color={number.color}
          numberToPlay={addNumberToPlay}
          isPlaying={isPlaying}
          isClear={isClear}
        />
      ))}
    </div>
  )
}

type ClothProps = {
  numbers: NumberData[]
  addNumberToPlay: (number: string) => void
  isPlaying: boolean
}

const Cloth = ({ numbers, addNumberToPlay, isPlaying }: ClothProps) => {
  const [isClear, setIsClear] = useState(false)

  const clearCloth = () => {
    if (!isPlaying) setIsClear((prev) => !prev)
  }

  let listOfNumberRow: NumberData[] = []

  return (
    <>
      <button
        className="btnClear"
        onClick={clearCloth}
      >
        LIMPIAR PAÑO
      </button>
      <div className="clothPrincipalContent">
        <div className="numbersRowInCloth">
          <NumberInCloth
            key={numbers[0].value}
            number={numbers[0].value}
            color={numbers[0].color}
            numberToPlay={addNumberToPlay}
            isPlaying={isPlaying}
            isClear={isClear}
          />
        </div>
        {numbers.map((number, index) => {
          if (number.value !== '0') {
            listOfNumberRow.push(number)
            if (listOfNumberRow.length === 3) {
              const numbersToRow = [...listOfNumberRow]
              listOfNumberRow = []
              return (
                <NumberRow
                  key={index}
                  numbers={numbersToRow}
                  addNumberToPlay={addNumberToPlay}
                  isPlaying={isPlaying}
                  isClear={isClear}
                />
              )
            }
          }
          return null
        })}
      </div>
    </>
  )
}

export default Cloth
