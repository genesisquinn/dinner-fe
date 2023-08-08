
const ResetButton = () => {
    const handleResetClick = () => {
        
        localStorage.removeItem('likedRecipesCount');
        localStorage.removeItem('likedIngredients');
        localStorage.removeItem('groceryItems');


        window.location.reload();
    };

    return (
        <button onClick={handleResetClick} className="reset-button">
            Reset Liked Recipes
        </button>
    );
};

export default ResetButton;
