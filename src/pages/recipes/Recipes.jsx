// import RecipeCard from "../../components/recipecard/recipecard";
// import PageNav from "../../components/pagenav/pagenav.jsx";
// import LikesCounter from "../../components/likes";
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:3000';

// const Recipes = () => {
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

//     return (
//         <div>
//             <LikesCounter likesCount={likesCount} />
//             {recipes.map((recipe) => (
//                 <RecipeCard
//                     key={recipe._id} // Assuming recipe._id is a unique identifier for each recipe.
//                     setLikesCount={setLikesCount}
//                     recipeId={recipe._id}
//                     name={recipe.name}
//                     category={recipe.category}
//                     image={recipe.image}
//                 />
//             ))}
//             <PageNav />
//         </div>
//     );
// }

// export default Recipes;



import RecipeCard from "../../components/recipecard/recipecard";
import PageNav from "../../components/pagenav/pagenav.jsx";
import LikesCounter from "../../components/likes";
import GroceryList from "../../components/grocerylist/grocerylist";
import { useState, useEffect } from 'react';
import axios from 'axios';

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

    // State to store liked recipes and their ingredients
    const [likedRecipes, setLikedRecipes] = useState([]);

    // Function to add a recipe to likedRecipes
    const addToLikedRecipes = (recipe) => {
        setLikedRecipes([...likedRecipes, recipe]);
    };

    // Function to remove a recipe from likedRecipes
    const removeFromLikedRecipes = (recipe) => {
        setLikedRecipes(likedRecipes.filter((likedRecipe) => likedRecipe.recipeId !== recipe.recipeId));
    };

    // Function to delete all items from grocery list
    const deleteAllItems = () => {
        setLikedRecipes([]); // This will clear the grocery list by setting the state to an empty array.
    };

    return (
        <div>
            <LikesCounter likesCount={likesCount} />
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    setLikesCount={setLikesCount}
                    recipeId={recipe._id}
                    name={recipe.name}
                    category={recipe.category}
                    image={recipe.image}
                    ingredients={recipe.ingredients}
                    isLiked={likedRecipes.some((likedRecipe) => likedRecipe.recipeId === recipe._id)}
                    onLikeChange={(isLiked) => {
                        if (isLiked) {
                            addToLikedRecipes(recipe);
                        } else {
                            removeFromLikedRecipes(recipe);
                        }
                    }}
                />
            ))}
            {likedRecipes.length > 0 && (
                <GroceryList
                    items={likedRecipes.flatMap((recipe) => recipe.ingredients)}
                    setItems={setLikedRecipes}
                    onDelete={deleteAllItems}
                />
            )}
            <PageNav />
        </div>
    );
}

export default Recipes;
