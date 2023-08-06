import RecipeCard from "../../components/recipecard/recipecard";
import PageNav from "../../components/pagenav/pagenav.jsx";
import LikesCounter from "../../components/likes";
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const Recipes = () => {
    const [likesCount, setLikesCount] = useState(() => {
        const storedLikesCount = localStorage.getItem('likesCount');
        return storedLikesCount ? parseInt(storedLikesCount) : 0;
    });

    useEffect(() => {
        localStorage.setItem('likesCount', likesCount.toString());
    }, [likesCount]);

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/recipes`)
            .then((response) => {
                setRecipes(response.data.recipes);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    return (
        <div>
            <LikesCounter likesCount={likesCount} />
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe._id} // Assuming recipe._id is a unique identifier for each recipe.
                    setLikesCount={setLikesCount}
                    recipeId={recipe._id}
                    name={recipe.name}
                    category={recipe.category}
                    image={recipe.image}
                />
            ))}
            <PageNav />
        </div>
    );
}

export default Recipes;

//     return (
//         <div>
//             <LikesCounter likesCount={likesCount} />
//             <RecipeCard setLikesCount={setLikesCount} recipeId="recipe1" />
//             <RecipeCard setLikesCount={setLikesCount} recipeId="recipe2" />
//             <PageNav />
//         </div>
//     );
// }

// export default Recipes;



