import type { Jugador } from '../types/Types'

const STORAGE_KEY = 'players-register'

export const guardarJugadoresStorage = (jugadores: Jugador[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jugadores))
}

export const leerJugadoresStorage = (): Jugador[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const actualizarPuntaje = (id: string, nuevoPuntaje: number) => {
  const jugadores = leerJugadoresStorage()

  const actualizados = jugadores.map((jugador) =>
    jugador.id === id
      ? { ...jugador, puntaje: jugador.puntaje + nuevoPuntaje }
      : jugador
  )

  guardarJugadoresStorage(actualizados)
}
