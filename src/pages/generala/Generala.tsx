import { useState } from 'react'
import { verJugadaActual } from './jugadasPosibles'
import { actualizarPuntajeYPosiciones } from '../../data/registroJugadores'
import Dado from '../../components/Dado/Dado'
import type { Jugador } from '../../types/Types'
import type { JUGADA } from './Generala_Types'

const Generala = ({
  jugadores,
  setJugadores,
}: {
  jugadores: Jugador[]
  setJugadores: React.Dispatch<React.SetStateAction<Jugador[]>>
}) => {
  const [dados, setDados] = useState<{ value: number | null; fijo: boolean }[]>(
    Array(5).fill({ value: null, fijo: false })
  )
  const [tiradas, setTiradas] = useState(3)
  const [jugadaActual, setJugadaActual] = useState<JUGADA | null>(null)
  const [turnoActual, setTurnoActual] = useState<Jugador | null>(
    jugadores[0] ?? null
  )

  const finDeTurno = () => {
    if (!jugadores.length || !turnoActual || !jugadaActual) return

    const jugadoresActualizados = actualizarPuntajeYPosiciones(
      jugadores,
      turnoActual.id,
      jugadaActual.valor
    )

    setJugadores(jugadoresActualizados) // 👈 esto actualiza el estado en GameEstructure

    const indexActual = jugadoresActualizados.findIndex(
      (j) => j.id === turnoActual.id
    )
    const indexSiguiente = (indexActual + 1) % jugadoresActualizados.length
    setTurnoActual(jugadoresActualizados[indexSiguiente])
    setTiradas(3)
    setDados(Array(5).fill({ value: null, fijo: false }))
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
      <h1>GENERALA</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Turno de {turnoActual?.nombre}</h2>
          <h3>
            {jugadaActual?.nombre} ---- {jugadaActual?.valor}
          </h3>
          <h3>TIROS RESTANTES {tiradas}</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {dados.map(({ value, fijo }, index) => (
              <Dado
                key={`${tiradas}-${index}`}
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
      {tiradas > 0 ? <button onClick={tirarDados}>TIRAR DADOS</button> : null}
      <button onClick={finDeTurno}>SIGUIENTE TURNO</button>
    </div>
  )
}

export default Generala
