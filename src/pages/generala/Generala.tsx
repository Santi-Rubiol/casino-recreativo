import { useState } from 'react'
import { verJugadaActual } from './jugadasPosibles'
import Dado from '../../components/Dado/Dado'

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

  const tirarDados = () => {
    const nuevos = dados.map((dado) =>
      dado.fijo ? dado : { ...dado, value: Math.ceil(Math.random() * 6) }
    )

    const jugada = verJugadaActual(nuevos.map((dado) => dado.value ?? 0))
    setJugadaActual(jugada)
    setDados(nuevos)
    setTiradas(tiradas - 1)
  }

  /* useEffect(() => {
    if (tiradas !== 3) {
      jugadaActual(dados.map((dado) => dado.value ?? 0))
    }
  }, [dados, tiradas]) */

  return (
    <div>
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
      {/* <h1>GENERALA</h1> */}
      {/* {tiradas > 0 ? (
        <>
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
      )} */}

      <button onClick={tirarDados}>Tirar Dados</button>
    </div>
  )
}

export default Generala
