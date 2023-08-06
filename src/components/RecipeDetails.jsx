import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

    return (
        <>
            <div className="container text-center">
                <img
                    src={recipe.image}
                    className="img-fluid mt-4"
                    alt={recipe.name}
                    loading="lazy"
                    style={{ maxHeight: '400px' }} // Set a maximum height for the image
                />
                <h1 className="mt-4">{recipe.name}</h1>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <i className="bi bi-tag"></i> {recipe.category}
                            </div>
                            <div className="col-12" style={{ whiteSpace: 'pre-line' }}>
                                <h4>Cooking Instructions</h4>
                                {recipe.instructions}
                            </div>
                        </div>

                        <div className="row pt-4">
                            <div className="col-12">
                                <h4>Ingredients</h4>
                                <ul className="list-group list-group-flush">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index} className="list-group-item">
                                            {ingredient}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeDetails;


