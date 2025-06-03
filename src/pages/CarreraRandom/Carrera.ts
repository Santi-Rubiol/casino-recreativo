import type { Jugador } from '../../types/Types'

export interface Competitor {
  id: number
  name: string
  emoji: string
}

export interface Corredor {
  id: string
  jugador: Jugador
  emoji: string
}
