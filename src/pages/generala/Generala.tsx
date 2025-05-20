import { useState, useEffect } from 'react'
import { verJugadaActual } from './jugadasPosibles'
import Dado from '../../components/Dado/Dado'
import PlayersRegister from '../../components/PlayersRegister/PlayersRegister'
import type { Jugador } from '../../types/Types'

const Generala = () => {
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
  const [jugadaActual, setJugadaActual] = useState('')
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [registroConfirmado, setRegistroConfirmado] = useState(false)

  const tirarDados = () => {
    const nuevos = dados.map((dado) =>
      dado.fijo ? dado : { ...dado, value: Math.ceil(Math.random() * 6) }
    )

    const jugada = verJugadaActual(nuevos.map((dado) => dado.value ?? 0))
    setJugadaActual(jugada)
    setDados(nuevos)
    setTiradas(tiradas - 1)
  }

  useEffect(() => {
    if (tiradas !== 3) {
      verJugadaActual(dados.map((dado) => dado.value ?? 0))
    }
  }, [dados, tiradas])

  return (
    <div>
      <h1>GENERALA</h1>
      {jugadores.map((jugador) => (
        <p key={jugador.id}>{jugador.nombre}</p>
      ))}
      {!registroConfirmado ? (
        <PlayersRegister
          onConfirm={(lista) => {
            setJugadores(lista)
            setRegistroConfirmado(true)
          }}
        />
      ) : tiradas > 0 ? (
        <>
          <h2>{jugadaActual}</h2>
          <h3>TIROS RESTANTES {tiradas}</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {dados.map(({ value, fijo }, index) => (
              <Dado
                key={index}
                value={value ?? undefined}
                fijo={fijo}
                onClick={() => {
                  const nuevos = [...dados]
                  nuevos[index].fijo = !nuevos[index].fijo
                  setDados(nuevos)
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}

      <button onClick={tirarDados}>Tirar Dados</button>
    </div>
  )
}

export default Generala
