import type { Jugador } from '../../types/Types'

const Leaderboard = ({ jugadores }: { jugadores: Jugador[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>NOMBRE</th>
          <th>PUNTOS</th>
        </tr>
      </thead>
      <tbody>
        {jugadores.map((jugador) => (
          <tr key={jugador.id}>
            <td>{jugador.nombre}</td>
            <td>{jugador.puntaje ?? 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Leaderboard
