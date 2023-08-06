import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
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

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Name </Card.Title>
                <Card.Text>Category </Card.Text>
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
    setLikesCount: PropTypes.func.isRequired,
    recipeId: PropTypes.string.isRequired,
};

export default RecipeCard;