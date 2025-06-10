import { useRef, useEffect, useState } from 'react'
import './Roulette.css'

type RouletteNumber = {
  value: string
  color: string
}

type RouletteProps = {
  numbersOfRoulette: RouletteNumber[]
  numberWinner: (num: string) => void
  setIsRotating: (rotating: boolean) => void
  setIsPlaying: (playing: boolean) => void
}

const Roulette = ({
  numbersOfRoulette,
  numberWinner,
  setIsRotating,
  setIsPlaying,
}: RouletteProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rouletteRadio = 200
  const arc = Math.PI / (numbersOfRoulette.length / 2)
  const [startAngle, setStartAngle] = useState(0)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctxRef.current = ctx
        drawRouletteWheel(ctx, startAngle)
      }
    }
  }, [numbersOfRoulette])

  const drawArrow = (ctx: CanvasRenderingContext2D, outsideRadius: number) => {
    ctx.fillStyle = 'rgb(200, 200, 50)'
    ctx.beginPath()
    ctx.moveTo(rouletteRadio - 4, rouletteRadio - (outsideRadius + 5))
    ctx.lineTo(rouletteRadio + 4, rouletteRadio - (outsideRadius + 5))
    ctx.lineTo(rouletteRadio + 4, rouletteRadio - (outsideRadius - 5))
    ctx.lineTo(rouletteRadio + 9, rouletteRadio - (outsideRadius - 5))
    ctx.lineTo(rouletteRadio + 0, rouletteRadio - (outsideRadius - 13))
    ctx.lineTo(rouletteRadio - 9, rouletteRadio - (outsideRadius - 5))
    ctx.lineTo(rouletteRadio - 4, rouletteRadio - (outsideRadius - 5))
    ctx.lineTo(rouletteRadio - 4, rouletteRadio - (outsideRadius + 5))
    ctx.fill()
  }

  const drawCenter = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgb(200, 200, 50)'
    ctx.beginPath()
    ctx.moveTo(rouletteRadio, rouletteRadio)
    ctx.lineTo(rouletteRadio - 10, rouletteRadio - 100)
    ctx.lineTo(rouletteRadio + 10, rouletteRadio - 100)
    ctx.moveTo(rouletteRadio, rouletteRadio)
    ctx.lineTo(rouletteRadio - 10, rouletteRadio + 100)
    ctx.lineTo(rouletteRadio + 10, rouletteRadio + 100)
    ctx.moveTo(rouletteRadio, rouletteRadio)
    ctx.lineTo(rouletteRadio - 100, rouletteRadio - 10)
    ctx.lineTo(rouletteRadio - 100, rouletteRadio + 10)
    ctx.moveTo(rouletteRadio, rouletteRadio)
    ctx.lineTo(rouletteRadio + 100, rouletteRadio - 10)
    ctx.lineTo(rouletteRadio + 100, rouletteRadio + 10)
    ctx.fill()
  }

  const drawRouletteWheel = (
    ctx: CanvasRenderingContext2D,
    currentStartAngle: number
  ) => {
    const outsideRadius = (rouletteRadio * 4) / 5
    const textRadius = rouletteRadio * 0.64
    const insideRadius = rouletteRadio / 2

    ctx.clearRect(0, 0, rouletteRadio * 2, rouletteRadio * 2)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.font = 'bold 18px Helvetica, Arial'

    for (let i = 0; i < numbersOfRoulette.length; i++) {
      const angle = currentStartAngle + i * arc

      ctx.beginPath()
      ctx.arc(
        rouletteRadio,
        rouletteRadio,
        outsideRadius,
        angle,
        angle + arc,
        false
      )
      ctx.arc(
        rouletteRadio,
        rouletteRadio,
        insideRadius,
        angle + arc,
        angle,
        true
      )
      ctx.stroke()
      ctx.fillStyle = numbersOfRoulette[i].color
      ctx.fill()

      ctx.save()
      ctx.fillStyle = 'white'
      ctx.translate(
        rouletteRadio + Math.cos(angle + arc / 2) * textRadius,
        rouletteRadio + Math.sin(angle + arc / 2) * textRadius
      )
      ctx.rotate(angle + arc / 2 + Math.PI / 2)
      const text = numbersOfRoulette[i].value
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
      ctx.restore()
    }

    drawArrow(ctx, outsideRadius)
    drawCenter(ctx)
  }

  const easeOut = (t: number, b: number, c: number, d: number): number => {
    const ts = (t /= d) * t
    const tc = ts * t
    return b + c * (tc + -3 * ts + 3 * t)
  }

  const spin = () => {
    setIsRotating(true)
    setIsPlaying(true)
    const spinAngleStart = Math.random() * 10 + 10
    let spinTime = 0
    const spinTimeTotal = (Math.random() * 3 + 4) * 1000

    const rotateWheel = () => {
      spinTime += 30
      if (spinTime >= spinTimeTotal) {
        stopRotateWheel()
        return
      }

      const spinAngle =
        spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal)
      setStartAngle((prev) => {
        const newAngle = prev + (spinAngle * Math.PI) / 180
        const ctx = ctxRef.current
        if (ctx) drawRouletteWheel(ctx, newAngle)
        return newAngle
      })

      setTimeout(rotateWheel, 30)
    }

    rotateWheel()
  }

  const stopRotateWheel = () => {
    setIsRotating(false)
    const ctx = ctxRef.current
    if (!ctx) return

    const degrees = (startAngle * 180) / Math.PI + 90
    const arcd = (arc * 180) / Math.PI
    const index = Math.floor((360 - (degrees % 360)) / arcd)
    const winner = numbersOfRoulette[index]

    ctx.save()
    ctx.font = 'bold 50px Helvetica, Arial'
    ctx.fillStyle = winner.color
    ctx.fillText(
      winner.value,
      rouletteRadio - ctx.measureText(winner.value).width / 2,
      rouletteRadio + 10
    )
    ctx.restore()

    numberWinner(winner.value)
  }

  return (
    <div>
      <input
        className="button"
        type="button"
        value="GIRA LA RULETA"
        style={{ float: 'left' }}
        id="spin"
        onClick={spin}
      />
      <canvas
        ref={canvasRef}
        width={rouletteRadio * 2}
        height={rouletteRadio * 2}
      />
    </div>
  )
}

export default Roulette
