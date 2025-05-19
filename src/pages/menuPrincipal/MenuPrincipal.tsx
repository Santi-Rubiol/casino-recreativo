import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

const MenuPrincipal = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Button
        text="GENERALA"
        onClick={() => navigate('/generala')}
      />

      <Button
        text="EJEMPLO"
        onClick={() => console.log('PRUEBITA')}
      />
    </div>
  )
}

export default MenuPrincipal
