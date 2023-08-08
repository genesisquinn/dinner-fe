import { useState, useEffect } from 'react';
import RecipeCard from "../components/RecipeCard";
import LikesCounter from "../components/Likes";
import axios from 'axios';
import ResetButton from '../components/ResetBtn'


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

    const [likedIngredients, setLikedIngredients] = useState([]);

    const handleLikedIngredientsUpdate = (ingredients) => {
        setLikedIngredients(ingredients);
    };

    useEffect(() => {
        const storedLikedIngredients = localStorage.getItem('likedIngredients');
        setLikedIngredients(storedLikedIngredients ? JSON.parse(storedLikedIngredients) : []);
    }, []);

    useEffect(() => {
        localStorage.setItem('likedIngredients', JSON.stringify(likedIngredients));
    }, [likedIngredients]);
    

    

    return (
        <div>
            <LikesCounter likesCount={likesCount} />
            <ResetButton  />
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    setLikesCount={setLikesCount}
                    recipeId={recipe._id}
                    name={recipe.name}
                    category={recipe.category}
                    image={recipe.image}
                    ingredients={recipe.ingredients}
                    onLikedIngredientsUpdate={handleLikedIngredientsUpdate}
                />
            ))}
        </div>
    );
};

export default Recipes;

