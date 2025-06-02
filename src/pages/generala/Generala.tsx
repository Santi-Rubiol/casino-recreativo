import { useState } from 'react'
import { verJugadaActual } from './jugadasPosibles'
import { useNavigate } from 'react-router-dom'
import {
  leerJugadoresStorage,
  actualizarPuntaje,
} from '../../data/registroJugadores'
import Dado from '../../components/Dado/Dado'
import Leaderboard from '../../components/Leaderboard/Leaderboard'
import type { Jugador } from '../../types/Types'
import type { JUGADA } from './Generala_Types'

const Generala = () => {
  const navigate = useNavigate()
  const [dados, setDados] = useState<{ value: number | null; fijo: boolean }[]>(
    [
      { value: null, fijo: false },
      { value: null, fijo: false },
      { value: null, fijo: false },
      { value: null, fijo: false },
      { value: null, fijo: false },
    ]
  )
  const [tiradas, setTiradas] = useState(3)
  const [jugadaActual, setJugadaActual] = useState<JUGADA | null>(null)
  const [turnoActual, setTurnoActual] = useState<Jugador | null>(null)
  const jugadores: Jugador[] = leerJugadoresStorage()

  /* useEffect(() => {
    if (tiradas !== 3) {
      verJugadaActual(dados.map((dado) => dado.value ?? 0))
    }
  }, [dados, tiradas]) */

  if (!turnoActual) {
    setTurnoActual(jugadores[0])
    return
  }

  const finDeTurno = () => {
    if (!jugadores.length) return

    const jugadoresOrdenados = [...jugadores].sort(
      (a, b) => a.posicion - b.posicion
    )

    // Buscar el índice del turno actual
    const indexActual = jugadoresOrdenados.findIndex(
      (j) => j.id === turnoActual.id
    )
    const indexSiguiente = (indexActual + 1) % jugadoresOrdenados.length
    if (jugadaActual) {
      turnoActual.puntaje = turnoActual.puntaje + jugadaActual?.valor
      console.log(
        'SUMAR ' + jugadaActual?.valor + ' puntos a ' + turnoActual.nombre
      )
      actualizarPuntaje(turnoActual.id, jugadaActual?.valor)
    }
    setTurnoActual(jugadoresOrdenados[indexSiguiente])
    setTiradas(3)
    setDados([
      { value: null, fijo: false },
      { value: null, fijo: false },
      { value: null, fijo: false },
      { value: null, fijo: false },
      { value: null, fijo: false },
    ])
    setJugadaActual(null)
  }

  const tirarDados = () => {
    const nuevos = dados.map((dado) =>
      dado.fijo ? dado : { ...dado, value: Math.ceil(Math.random() * 6) }
    )

    const jugada = verJugadaActual(nuevos.map((dado) => dado.value ?? 0))
    setJugadaActual(jugada)
    setDados(nuevos)
    setTiradas(tiradas - 1)
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>VOLVER AL MENÚ</button>
      <h1>GENERALA</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem',
          width: '100%',
          padding: '1rem',
        }}
      >
        <div>
          <Leaderboard jugadores={jugadores} />
        </div>
        <div>
          <h2>Turno de {turnoActual?.nombre}</h2>
          <h3>
            {jugadaActual?.nombre} ---- {jugadaActual?.valor}
          </h3>
          <h3>TIROS RESTANTES {tiradas}</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {dados.map(({ value, fijo }, index) => (
              <Dado
                key={index}
                value={value ?? undefined}
                fijo={fijo && tiradas > 0}
                onClick={() => {
                  const nuevos = [...dados]
                  nuevos[index].fijo = !nuevos[index].fijo
                  setDados(nuevos)
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {tiradas > 0 ? <button onClick={tirarDados}>TIRAR DADOS</button> : <></>}
      <button onClick={finDeTurno}>SIGUIENTE TURNO</button>
    </div>
  )
}

export default Generala
