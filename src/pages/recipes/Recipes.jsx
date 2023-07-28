import RecipeCard from "../../components/recipecard/recipecard"
import PageNav from "../../components/pagenav/pagenav.jsx"
import LikesCounter from "../../components/likes"
import { useState, useEffect } from 'react';

const Recipes = () => {
    const [likesCount, setLikesCount] = useState(() => {
        const storedCount = localStorage.getItem('likesCount');
        return storedCount ? parseInt(storedCount, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('likesCount', likesCount.toString());
    }, [likesCount]);

    return (
        <div>
            <LikesCounter likesCount={likesCount} />
            <RecipeCard setLikesCount={setLikesCount} />
            <PageNav />
        </div>
    );
}

export default Recipes;