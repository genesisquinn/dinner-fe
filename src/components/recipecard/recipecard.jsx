import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './recipecard.css';

const RecipeCard = ({ recipeId, name, category, image, ingredients }) => {
    const [isLiked, setIsLiked] = useState(() => {
        const storedIsLiked = localStorage.getItem(`likedRecipe_${recipeId}`);
        return storedIsLiked === 'true';
    });

    useEffect(() => {
        localStorage.setItem(`likedRecipe_${recipeId}`, isLiked.toString());
    }, [recipeId, isLiked]);

    const handleLikeClick = () => {
        setIsLiked((prevIsLiked) => {
            const newIsLiked = !prevIsLiked;
            if (newIsLiked) {
                addToGroceryList();
            } else {
                removeFromGroceryList();
            }
            return newIsLiked;
        });
    };

    const addToGroceryList = () => {
        const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
        const newGroceryItems = [
            ...groceryItems,
            ...ingredients.map((ingredient) => ({ name: ingredient, crossed: false })),
        ];
        localStorage.setItem('groceryItems', JSON.stringify(newGroceryItems));
    };

    const removeFromGroceryList = () => {
        const groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];
        const newGroceryItems = groceryItems.filter((item) => !ingredients.includes(item.name));
        localStorage.setItem('groceryItems', JSON.stringify(newGroceryItems));
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
};

export default RecipeCard;