import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./recipecard.css";

const RecipeCard = ({ setLikesCount, recipeId }) => {
    const [isLiked, setIsLiked] = useState(() => {
        const storedIsLiked = localStorage.getItem(`likedRecipe_${recipeId}`);
        return storedIsLiked === 'true';
    });

    useEffect(() => {
        localStorage.setItem(`likedRecipe_${recipeId}`, isLiked.toString());
    }, [isLiked, recipeId]);

    const handleLikeClick = () => {
        setIsLiked((prevIsLiked) => {
            const newIsLiked = !prevIsLiked;
            setLikesCount((prevCount) => prevCount + (newIsLiked ? 1 : -1));
            return newIsLiked;
        });
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
    recipeId: PropTypes.string.isRequired,
};

export default RecipeCard;