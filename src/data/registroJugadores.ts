import type { Jugador } from '../types/Types'

const STORAGE_KEY = 'players-register'

export const guardarJugadoresStorage = (jugadores: Jugador[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jugadores))
}

export const leerJugadoresStorage = (): Jugador[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const actualizarPuntajeYPosiciones = (
  jugadores: Jugador[],
  id: string,
  puntos: number
): Jugador[] => {
  const actualizados = jugadores.map((j) =>
    j.id === id ? { ...j, puntaje: j.puntaje + puntos } : j
  )

  const ordenados = [...actualizados].sort((a, b) => b.puntaje - a.puntaje)

  const reposicionados = ordenados.map((j, i) => ({
    ...j,
    posicion: i + 1,
  }))

  guardarJugadoresStorage(reposicionados)
  return reposicionados
}
