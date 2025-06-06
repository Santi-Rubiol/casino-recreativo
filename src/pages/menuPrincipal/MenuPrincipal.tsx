import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { leerJugadoresStorage } from '../../data/registroJugadores'
import Button from '../../components/Button/Button'
import PlayersRegister from '../../components/PlayersRegister/PlayersRegister'
import type { Jugador } from '../../types/Types'

const MenuPrincipal = () => {
  const navigate = useNavigate()
  const [jugadores, setJugadores] = useState<Jugador[]>(() =>
    leerJugadoresStorage()
  )

  return (
    <div>
      <PlayersRegister
        jugadores={jugadores}
        setJugadores={setJugadores}
      />
      <Button
        text="GENERALA"
        onClick={() => {
          if (jugadores.length > 0) {
            navigate('/generala')
          } else {
            alert('NO LISTASTE JUGADORES')
          }
        }}
      />
      <Button
        text="CARRERAS"
        onClick={() => {
          if (jugadores.length > 0) {
            navigate('/random-race')
          } else {
            alert('NO LISTASTE JUGADORES')
          }
        }}
      />
      <Button
        text="TRAGAMONEDAS"
        onClick={() => {
          if (jugadores.length > 0) {
            navigate('/tragamonedas')
          } else {
            alert('NO LISTASTE JUGADORES')
          }
        }}
      />

      <Button
        text="EJEMPLO"
        onClick={() => console.log('PRUEBITA')}
      />
    </div>
  )
}

export default MenuPrincipal
