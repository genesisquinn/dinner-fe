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
import GroceryList from "../../components/grocerylist/grocerylist"; // Import the GroceryList component
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
    const [groceryItems, setGroceryItems] = useState([]); // Store grocery items in the state

    useEffect(() => {
        axios.get(`${BASE_URL}/recipes`)
            .then((response) => {
                setRecipes(response.data.recipes);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });

        // Load grocery items from local storage when the component mounts
        const storedGroceryItems = localStorage.getItem('groceryItems');
        if (storedGroceryItems) {
            setGroceryItems(JSON.parse(storedGroceryItems));
        }
    }, []);

    const handleLikeChange = (recipeId, isLiked, ingredients) => {
        setLikesCount((prevLikesCount) => prevLikesCount + (isLiked ? 1 : -1));

        // Add or remove ingredients from the grocery list based on like status
        if (isLiked) {
            addToGroceryList(ingredients);
        } else {
            removeFromGroceryList(ingredients);
        }
    };

    const addToGroceryList = (ingredients) => {
        const newGroceryItems = [
            ...groceryItems,
            ...ingredients.map((ingredient) => ({ name: ingredient, crossed: false })),
        ];
        setGroceryItems(newGroceryItems); // Update the state with new grocery items
        localStorage.setItem('groceryItems', JSON.stringify(newGroceryItems));
    };

    const removeFromGroceryList = (ingredients) => {
        const newGroceryItems = groceryItems.filter((item) => !ingredients.includes(item.name));
        setGroceryItems(newGroceryItems); // Update the state with new grocery items
        localStorage.setItem('groceryItems', JSON.stringify(newGroceryItems));
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
                    onLikeChange={handleLikeChange} // Pass the handleLikeChange function to RecipeCard
                />
            ))}
            <GroceryList items={groceryItems} setItems={setGroceryItems} /> {/* Pass the groceryItems state to GroceryList */}
            <PageNav />
        </div>
    );
}

export default Recipes;