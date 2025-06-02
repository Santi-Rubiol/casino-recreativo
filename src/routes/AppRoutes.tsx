import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuPrincipal from '../pages/menuPrincipal/MenuPrincipal'
import Generala from '../pages/generala/Generala'
import RandomRaceGame from '../pages/CarreraRandom/CarreraRandom'

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<MenuPrincipal />}
      />
      <Route
        path="/generala"
        element={<Generala />}
      />
      <Route
        path="/random-race"
        element={<RandomRaceGame />}
      />
    </Routes>
  </Router>
)

export default AppRoutes
