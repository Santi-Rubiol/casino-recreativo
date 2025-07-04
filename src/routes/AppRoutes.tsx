import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuPrincipal from '../pages/menuPrincipal/MenuPrincipal'
import Generala from '../pages/generala/Generala'
import RandomRaceGame from '../pages/CarreraRandom/CarreraRandom'
import TragaMonedas from '../pages/TragaMonedas/TragaMonedas'
import InteractiveRoulette from '../pages/InteractiveRoulette/InteractiveRoulette'
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
        element={<GameEstructure MainContent={TragaMonedas} />}
      />
      <Route
        path="/ruleta"
        element={<GameEstructure MainContent={InteractiveRoulette} />}
      />
    </Routes>
  </Router>
)

export default AppRoutes
