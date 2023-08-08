import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const RandomizerButton = ({ recipes }) => {
    const handleRandomizeClick = () => {
        const randomRecipeIds = [];
        const maxLikes = 7; 
        while (randomRecipeIds.length < maxLikes) {
            const randomIndex = Math.floor(Math.random() * recipes.length);
            const randomRecipe = recipes[randomIndex];
            if (!randomRecipe.liked) {
                randomRecipeIds.push(randomRecipe._id);
                randomRecipe.liked = true; 
            }
        }
    
        randomRecipeIds.forEach((recipeId) => {
            localStorage.setItem(`likedRecipe_${recipeId}`, 'true');
        });
        window.location.reload(); 
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
};

export default RandomizerButton;




