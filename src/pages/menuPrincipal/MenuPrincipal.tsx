import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import PlayersRegister from '../../components/PlayersRegister/PlayersRegister'
import type { Jugador } from '../../types/Types'

const MenuPrincipal = () => {
  const navigate = useNavigate()
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  //const [registroConfirmado, setRegistroConfirmado] = useState(false)

  useEffect(() => {}, [jugadores])

  return (
    <div>
      <PlayersRegister
        onConfirm={(lista) => {
          setJugadores(lista)
          // setRegistroConfirmado(true)
        }}
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
        text="EJEMPLO"
        onClick={() => console.log('PRUEBITA')}
      />
    </div>
  )
}

export default MenuPrincipal
