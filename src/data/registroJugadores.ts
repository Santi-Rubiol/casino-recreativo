import type { Jugador } from '../types/Types'

const STORAGE_KEY = 'players-register'

export const guardarJugadoresStorage = (jugadores: Jugador[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jugadores))
}

export const leerJugadoresStorage = (): Jugador[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}
