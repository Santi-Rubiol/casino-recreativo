import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuPrincipal from '../pages/menuPrincipal/MenuPrincipal'
import Generala from '../pages/generala/Generala'

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
    </Routes>
  </Router>
)

export default AppRoutes
