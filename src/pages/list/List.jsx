import "./list.css"
import GroceryList from "../../components/grocerylist/grocerylist";

const List = () => {
    // Fetch grocery items from local storage and parse them
    const storedGroceryItems = localStorage.getItem('groceryItems');
    const groceryItems = storedGroceryItems ? JSON.parse(storedGroceryItems) : [];

    return (
        <div>
            <GroceryList items={groceryItems} setItems={() => {}} />
        </div>
    )
}

export default List;