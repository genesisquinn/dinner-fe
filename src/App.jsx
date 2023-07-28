
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css';
import Navigation from './navigation/navigation'
import Home from './pages/home/home'
import Recipes from './pages/recipes/recipes'
import Meals from "./pages/meals/Meals"
import List from './pages/list/List'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

//   return (
//     <Router>
//       <Navigation />
//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route path="/recipes" element={<Recipes/>} />
//         <Route path="/meals" element={<Meals/>} />
//         <Route path="/list" element={<List/>} />
//       </Routes>
//     </Router>
//   );
// }

export default App
