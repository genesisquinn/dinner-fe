
const ResetButton = () => {
    const handleResetClick = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <button onClick={handleResetClick} className="reset-button">
            Reset Liked Recipes
        </button>
    );
};

export default ResetButton;
