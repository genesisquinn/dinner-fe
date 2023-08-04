
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './navigation/Navigation'
import Home from './pages/home/Home'
import Recipes from './pages/recipes/Recipes'
import Meals from "./pages/meals/Meals"
import List from './pages/list/List'
import Submit from './pages/recipes/recipeForm'

function App() {
  return (
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/list" element={<List />} />
          <Route path="/submit-recipe" element={<Submit />} />
        </Routes>
      </Router>
  );
}


export default App
