import { useState, useEffect } from 'react';
import LikesCounter from "../components/Likes";
import axios from 'axios';
import ResetButton from '../components/ResetBtn'
import RecipeCard from '../components/recipecard';
import RandomizerButton from '../components/Randomizer';


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

    const recipesWithLikedProperty = recipes.map((recipe) => ({
        ...recipe,
        liked: localStorage.getItem(`likedRecipe_${recipe._id}`) === 'true',
    }));

    const handleRandomLike = (randomRecipeIds) => {
        const updatedRecipes = recipes.map((recipe) => {
            if (randomRecipeIds.includes(recipe._id)) {
                return { ...recipe, liked: true };
            }
            return recipe;
        });
        setRecipes(updatedRecipes);
    };
    
    const addToGroceryList = (ingredientsToAdd) => {
        const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
        const newGroceryItems = [
            ...groceryItems,
            ...ingredientsToAdd.map((ingredient) => ({ name: ingredient, crossed: false })),
        ];
        localStorage.setItem('groceryItems', JSON.stringify(newGroceryItems));

        handleLikedIngredientsUpdate(newGroceryItems.map((item) => item.name));
    };


    return (
        <div>
            <RandomizerButton
                recipes={recipesWithLikedProperty}
                onRandomLike={handleRandomLike}
                likedIngredients={likedIngredients} 
                onAddToGroceryList={addToGroceryList} 
            />
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
                    onAddToGroceryList={addToGroceryList} 
                />
            ))}
        </div>
    );
};

export default Recipes;

