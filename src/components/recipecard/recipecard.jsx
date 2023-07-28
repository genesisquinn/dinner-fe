import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./recipecard.css"

const RecipeCard = ({ setLikesCount }) => {
    const [isLiked, setIsLiked] = useState(() => {
        // Check if the recipe is already liked in localStorage
        return localStorage.getItem('likedRecipe') === 'true';
    });

    useEffect(() => {
        // Save the liked state to localStorage when it changes
        localStorage.setItem('likedRecipe', isLiked);
    }, [isLiked]);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        setLikesCount((prevCount) => prevCount + (isLiked ? -1 : 1));
    };

    const handleSeeRecipeClick = () => {
        console.log('See Recipe Clicked');
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Recipe Name</Card.Title>
                <Card.Text>Recipe Description</Card.Text>
                <div className="card-buttons">
                    <Button variant="primary" onClick={handleSeeRecipeClick}>
                        See Recipe
                    </Button>
                    <Button variant={isLiked ? 'danger' : 'secondary'} onClick={handleLikeClick}>
                        {isLiked ? '❤️ Liked' : '♡ Like'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

RecipeCard.propTypes = {
    setLikesCount: PropTypes.func.isRequired,
  };

export default RecipeCard;