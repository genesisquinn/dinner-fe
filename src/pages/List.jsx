import { useState, useEffect } from 'react';
import GroceryList from "../components/grocerylist";

const List = () => {
    const storedGroceryItems = localStorage.getItem('groceryItems');
    const [groceryItems, setGroceryItems] = useState(() => storedGroceryItems ? JSON.parse(storedGroceryItems) : []);
    const [likedIngredients, setLikedIngredients] = useState([]);

    useEffect(() => {
        localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
    }, [groceryItems]);

    return (
        <div>
            <GroceryList items={groceryItems} setItems={setGroceryItems} likedIngredients={likedIngredients} />
        </div>
    );
};

export default List;



