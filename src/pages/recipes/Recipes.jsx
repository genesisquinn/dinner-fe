import RecipeCard from "../../components/recipecard/recipecard";
import PageNav from "../../components/pagenav/pagenav.jsx";
import LikesCounter from "../../components/likes";
import { useState, useEffect } from 'react';

const Recipes = () => {
    const [likesCount, setLikesCount] = useState(() => {
        const storedLikesCount = localStorage.getItem('likesCount');
        return storedLikesCount ? parseInt(storedLikesCount) : 0;
    });

    useEffect(() => {
        localStorage.setItem('likesCount', likesCount.toString());
    }, [likesCount]);

    return (
        <div>
            <LikesCounter likesCount={likesCount} />
            <RecipeCard setLikesCount={setLikesCount} recipeId="recipe1" />
            <RecipeCard setLikesCount={setLikesCount} recipeId="recipe2" />
            <PageNav />
        </div>
    );
}

export default Recipes;



