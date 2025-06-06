import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuPrincipal from '../pages/MenuPrincipal/MenuPrincipal'
import Generala from '../pages/Generala/Generala'
import RandomRaceGame from '../pages/CarreraRandom/CarreraRandom'
import TragaMonedas from '../pages/TragaMonedas/TragaMonedas'
import GameEstructure from '../layout/GameEstructure'

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<MenuPrincipal />}
      />
      <Route
        path="/generala"
        element={<GameEstructure MainContent={Generala} />}
      />
      <Route
        path="/random-race"
        element={<GameEstructure MainContent={RandomRaceGame} />}
      />
      <Route
        path="/tragamonedas"
        element={<TragaMonedas />}
      />
    </Routes>
  </Router>
)

export default AppRoutes
