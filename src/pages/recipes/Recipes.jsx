// import RecipeCard from "../../components/recipecard/recipecard";
// import PageNav from "../../components/pagenav/pagenav.jsx";
// import LikesCounter from "../../components/likes";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';

// const BASE_URL = 'http://localhost:3000';

// const Recipes = ( { groceryItems, setGroceryItems }) => {
//     const [likesCount, setLikesCount] = useState(() => {
//         const storedLikesCount = localStorage.getItem('likesCount');
//         return storedLikesCount ? parseInt(storedLikesCount) : 0;
//     });

//     useEffect(() => {
//         localStorage.setItem('likesCount', likesCount.toString());
//     }, [likesCount]);

//     const [recipes, setRecipes] = useState([]);

//     useEffect(() => {
//         axios.get(`${BASE_URL}/recipes`)
//             .then((response) => {
//                 setRecipes(response.data.recipes);
//             })
//             .catch((error) => {
//                 console.error('Error fetching recipes:', error);
//             });
//     }, []);

//     const [likedIngredients, setLikedIngredients] = useState([]);

//     const handleLikedIngredientsUpdate = (ingredients) => {
//         setLikedIngredients(ingredients);
//     };

//     useEffect(() => {
//         const storedLikedIngredients = localStorage.getItem('likedIngredients');
//         setLikedIngredients(storedLikedIngredients ? JSON.parse(storedLikedIngredients) : []);
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('likedIngredients', JSON.stringify(likedIngredients));
//     }, [likedIngredients]);

//     const handleUnlikeAllRecipes = () => {
//         const confirmed = window.confirm('Are you sure you want to unlike all recipes?');
//         if (confirmed) {
//             // Reset the liked state for each recipe
//             recipes.forEach((recipe) => {
//                 localStorage.setItem(`likedRecipe_${recipe._id}`, 'false');
//             });

//             // Remove liked ingredients from the groceryItems
//             const updatedGroceryItems = groceryItems.filter((item) => !likedIngredients.includes(item.name));
//             setGroceryItems(updatedGroceryItems);

//             localStorage.setItem('likedRecipesCount', '0');
//             setLikesCount(0);
//             localStorage.removeItem('likedIngredients');
//             setLikedIngredients([]);
//         }
//     };


//     return (
//         <div>
//             <LikesCounter likesCount={likesCount} />
//             <button onClick={handleUnlikeAllRecipes}>Unlike All Recipes</button>
//             {recipes.map((recipe) => (
//                 <RecipeCard
//                     key={recipe._id}
//                     setLikesCount={setLikesCount}
//                     recipeId={recipe._id}
//                     name={recipe.name}
//                     category={recipe.category}
//                     image={recipe.image}
//                     ingredients={recipe.ingredients}
//                     onLikedIngredientsUpdate={handleLikedIngredientsUpdate}
//                 />
//             ))}
//             <PageNav />
//         </div>
//     );
// };


// Recipes.propTypes = {
//     groceryItems: PropTypes.arrayOf(
//         PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             crossed: PropTypes.bool.isRequired,
//         })
//     ).isRequired,
//     setGroceryItems: PropTypes.func.isRequired,
// };


// export default Recipes



import { useState, useEffect } from 'react';
import RecipeCard from "../../components/recipecard/recipecard";
import PageNav from "../../components/pagenav/pagenav.jsx";
import LikesCounter from "../../components/likes";
import axios from 'axios';
import ResetButton from '../../components/ResetBtn'


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
    

    

    return (
        <div>
            <LikesCounter likesCount={likesCount} />
            <ResetButton  />
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    setLikesCount={setLikesCount}
                    recipeId={recipe._id}
                    name={recipe.name}
                    category={recipe.category}
                    image={recipe.image}
                    ingredients={recipe.ingredients}
                    onLikedIngredientsUpdate={handleLikedIngredientsUpdate}
                />
            ))}
            <PageNav />
        </div>
    );
};

export default Recipes;

