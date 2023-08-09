import RecipeCard from '../components/recipecard';

const Meals = () => {
    
    const likedRecipes = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('likedRecipe_') && localStorage.getItem(key) === 'true') {
            const recipeId = key.replace('likedRecipe_', '');
            const recipeData = JSON.parse(localStorage.getItem(`recipe_${recipeId}`));
            if (recipeData) {
                likedRecipes.push(recipeData);
            }
        }
    }

    return (
        <div>
            <h2>Liked Recipes</h2>
            {likedRecipes.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    recipeId={recipe._id}
                    name={recipe.name}
                    category={recipe.category}
                    image={recipe.image}
                    ingredients={recipe.ingredients}
                    onLikedIngredientsUpdate={() => {}}
                    onAddToGroceryList={() => {}}
                />
            ))}
        </div>
    );
};

export default Meals;

