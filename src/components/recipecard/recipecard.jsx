import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './recipecard.css';

const RecipeCard = ({ recipeId, name, category, image, ingredients, onLikedIngredientsUpdate }) => {
    const [isLiked, setIsLiked] = useState(() => {
        const storedIsLiked = localStorage.getItem(`likedRecipe_${recipeId}`);
        return storedIsLiked === 'true';
    });

    useEffect(() => {
        localStorage.setItem(`likedRecipe_${recipeId}`, isLiked.toString());
    }, [recipeId, isLiked]);

    // const handleLikeClick = () => {
    //     setIsLiked((prevIsLiked) => {
    //         const newIsLiked = !prevIsLiked;
    //         if (newIsLiked) {
    //             addToGroceryList(ingredients);
    //         } else {
    //             removeFromGroceryList(ingredients);
    //         }
    //         return newIsLiked;
    //     });
    // };

    const handleLikeClick = () => {
        // Check the current number of liked recipes from localStorage
        const likedRecipesCount = parseInt(localStorage.getItem('likedRecipesCount')) || 0;

        if (likedRecipesCount < 7) {
            setIsLiked((prevIsLiked) => {
                const newIsLiked = !prevIsLiked;

                // Update the number of liked recipes in localStorage
                localStorage.setItem('likedRecipesCount', newIsLiked ? likedRecipesCount + 1 : likedRecipesCount - 1);

                if (newIsLiked) {
                    addToGroceryList(ingredients);
                } else {
                    removeFromGroceryList(ingredients);
                }
                return newIsLiked;
            });
        } else {
            // Show a popup to inform the user that they can only like 7 recipes
            alert('You can only like up to 7 recipes.');
        }
    };

    const addToGroceryList = (ingredientsToAdd) => {
        const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
        const newGroceryItems = [
            ...groceryItems,
            ...ingredientsToAdd.map((ingredient) => ({ name: ingredient, crossed: false })),
        ];
        localStorage.setItem('groceryItems', JSON.stringify(newGroceryItems));

        onLikedIngredientsUpdate(newGroceryItems.map((item) => item.name));
    };

    const removeFromGroceryList = (ingredientsToRemove) => {
        const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
        const newGroceryItems = groceryItems.filter((item) => !ingredientsToRemove.includes(item.name));
        localStorage.setItem('groceryItems', JSON.stringify(newGroceryItems));

        onLikedIngredientsUpdate(newGroceryItems.map((item) => item.name));
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{category}</Card.Text>
                <div className="card-buttons">
                    <Link to={`/recipes/${recipeId}`} className="recipe-btn">
                        See Recipe
                    </Link>
                    <Button variant={isLiked ? 'danger' : 'secondary'} onClick={handleLikeClick}>
                        {isLiked ? '❤️ Liked' : '♡ Like'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

RecipeCard.propTypes = {
    recipeId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    onLikedIngredientsUpdate: PropTypes.func.isRequired,
};

export default RecipeCard;