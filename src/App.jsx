
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './navigation/navigation'
import Home from './pages/home/home'
import Recipes from './pages/recipes/recipes'
import Meals from "./pages/meals/meals"
import List from './pages/list/list'

function App() {

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes/>} />
        <Route path="/meals" element={<Meals/>} />
        <Route path="/list" element={<List/>} />
      </Routes>
    </Router>
  );
}

export default App
