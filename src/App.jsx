
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Meals from "./pages/Meals";
import List from './pages/List';
import Submit from './pages/RecipeForm';
import RecipeDetails from './pages/RecipeDetails';
import Navigation from './components/Navigation';





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
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
  );
}


export default App
