import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';


const RandomizerButton = ({ recipes, onAddToGroceryList }) => {

    const randomizeRecipes = (recipes, maxLikes) => {
        const randomRecipeIds = [];
        while (randomRecipeIds.length < maxLikes) {
            const randomIndex = Math.floor(Math.random() * recipes.length);
            const randomRecipe = recipes[randomIndex];
            if (!randomRecipe.liked) {
                randomRecipeIds.push(randomRecipe._id);
                randomRecipe.liked = true;
            }
        }
        return randomRecipeIds;
    };

    const recipeIngredients = (recipeId, recipes) => {
        const recipe = recipes.find((recipe) => recipe._id === recipeId);
        if (recipe) {
            return recipe.ingredients;
        }
        return [];
    };
    
    const handleRandomizeClick = () => {
        const maxLikes = 7;
        const randomRecipeIds = randomizeRecipes(recipes, maxLikes);

    
        randomRecipeIds.forEach((recipeId) => {
            localStorage.setItem(`likedRecipe_${recipeId}`, 'true');

            const ingredients = recipeIngredients(recipeId, recipes);

            const likedIngredients = JSON.parse(localStorage.getItem('likedIngredients')) || [];
            likedIngredients.push(...ingredients);

            onAddToGroceryList(likedIngredients);

            window.location.reload();
            
        });

    };

    return (
        <Button variant="primary" onClick={handleRandomizeClick}>
            Randomly Like 7 Recipes
        </Button>
    );
};

RandomizerButton.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            liked: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onAddToGroceryList: PropTypes.func.isRequired,
};

export default RandomizerButton;



