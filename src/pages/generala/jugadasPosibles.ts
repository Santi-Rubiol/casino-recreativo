import type { JUGADA } from './Generala_Types'

export const JUGADAS: JUGADA[] = [
  { nombre: 'Generala', valor: 50 },
  { nombre: 'Poker', valor: 40 },
  { nombre: 'Full', valor: 30 },
  { nombre: 'Escalera', valor: 25 },
  { nombre: 'Trío', valor: 20 },
  { nombre: 'Nada', valor: 0 },
]

export function verJugadaActual(dados: number[]) {
  if (dados.length !== 5 || !dados.every((d) => d >= 1 && d <= 6)) {
    throw new Error('Debe haber exactamente 5 dados con valores del 1 al 6.')
  }
  let nombreJugadaActual = 'Nada'
  const contador: { [key: number]: number } = {}
  for (const dado of dados) {
    contador[dado] = (contador[dado] || 0) + 1
  }

  const cantidades = Object.values(contador).sort((a, b) => b - a)
  const dadosUnicos = [...new Set(dados)].sort((a, b) => a - b)

  if (cantidades[0] === 5) {
    nombreJugadaActual = 'Generala'
  } else if (cantidades[0] === 4) {
    nombreJugadaActual = 'Poker'
  } else if (cantidades[0] === 3 && cantidades[1] === 2) {
    nombreJugadaActual = 'Full'
  } else if (
    JSON.stringify(dadosUnicos) === JSON.stringify([1, 2, 3, 4, 5]) ||
    JSON.stringify(dadosUnicos) === JSON.stringify([2, 3, 4, 5, 6])
  ) {
    nombreJugadaActual = 'Escalera'
  } else if (cantidades[0] === 3) nombreJugadaActual = 'Trío'

  return JUGADAS.find((j) => j.nombre === nombreJugadaActual)!
}
