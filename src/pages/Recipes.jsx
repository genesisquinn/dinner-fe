import { useState, useEffect } from 'react';
import LikesCounter from "../components/Likes";
import axios from 'axios';
import ResetButton from '../components/ResetBtn'
import RecipeCard from '../components/recipecard';
import RandomizerButton from '../components/Randomizer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Recipes.css'


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

    const [isLikesBoxSticky, setIsLikesBoxSticky] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsLikesBoxSticky(true);
        } else {
            setIsLikesBoxSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const filtered = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecipes(filtered);
    }, [searchQuery, recipes]);

    return (
        <div className="recipes-container">
            <Form className="search-bar d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange} 
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            <div className={`buttons-container ${isLikesBoxSticky ? 'sticky' : ''}`}>
                <ResetButton className="reset-button" />
                <RandomizerButton className="randomizer-button"
                    recipes={recipesWithLikedProperty}
                    onRandomLike={handleRandomLike}
                    likedIngredients={likedIngredients}
                    onAddToGroceryList={addToGroceryList}
                />
                <div className="likes-count-box">
                    <LikesCounter className="likes-counter" likesCount={likesCount} />
                </div>
            </div>
            <div className="recipe-cards">
    {filteredRecipes.map((recipe) => (
        <RecipeCard
            key={recipe._id}
            className="recipe-card"
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
        </div>
    );
};

export default Recipes;

