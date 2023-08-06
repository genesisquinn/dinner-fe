import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./RecipeDetails.css";

const BASE_URL = 'http://localhost:3000';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/recipes/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then((data) => {
                console.log(data);
                return data.json();
            })
            .then((jsonData) => {
                console.log(jsonData);
                if (jsonData.success) {
                    setRecipe(jsonData.recipe);
                } else {
                    setRecipe(null);
                }
            })
            .catch((error) => {
                console.log(error);
                setRecipe(null);
            });
    }, [id]);
    console.log(recipe);

    if (recipe === null) {
        return <p>No item found.</p>;
    }

    const formatIngredients = recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ));

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 img-container">
                    <img
                        src={recipe.image}
                        className="img-fluid"
                        alt={recipe.name}
                    />
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8 recipe-details">
                    <h1 className="recipe-name">{recipe.name}</h1>
                    <div className="category">
                        <i className="bi bi-tag"></i> {recipe.category}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 instructions">
                    <h4>Cooking Instructions</h4>
                    {recipe.instructions}
                </div>

                <div className="col-md-6 ingredients">
                    <h4>Ingredients</h4>
                    <ul className="list-group list-group-flush grocery-list">
                        {formatIngredients}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;


