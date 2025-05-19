export function verJugadaActual(dados: number[]): string {
  console.log('Dados:', dados)
  if (dados.length !== 5 || !dados.every((d) => d >= 1 && d <= 6)) {
    throw new Error('Debe haber exactamente 5 dados con valores del 1 al 6.')
  }

  // Contar ocurrencias de cada número
  const contador: { [key: number]: number } = {}
  for (const dado of dados) {
    contador[dado] = (contador[dado] || 0) + 1
  }

  const cantidades = Object.values(contador).sort((a, b) => b - a)
  const dadosUnicos = [...new Set(dados)].sort((a, b) => a - b)

  // Verificar jugadas
  if (cantidades[0] === 5) return 'Generala'
  if (cantidades[0] === 4) return 'Poker'
  if (cantidades[0] === 3 && cantidades[1] === 2) return 'Full'
  if (
    JSON.stringify(dadosUnicos) === JSON.stringify([1, 2, 3, 4, 5]) ||
    JSON.stringify(dadosUnicos) === JSON.stringify([2, 3, 4, 5, 6])
  ) {
    return 'Escalera'
  }
  if (cantidades[0] === 3) return 'Trío'

  return 'Nada'
}
