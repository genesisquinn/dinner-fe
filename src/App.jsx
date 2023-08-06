
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './navigation/Navigation';
import Home from './pages/home/Home';
import Recipes from './pages/recipes/recipes';
import Meals from "./pages/meals/Meals";
import List from './pages/list/List';
import Submit from './pages/recipes/recipeForm';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';





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
