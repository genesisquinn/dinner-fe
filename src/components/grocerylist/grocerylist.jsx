import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './grocerylist.css';
import DeleteBtn from '../deletebtn/deletebtn';

const GroceryList = ({ items, setItems }) => {
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        // Load grocery items from local storage when the component mounts
        const storedGroceryItems = localStorage.getItem('groceryItems');
        if (storedGroceryItems) {
            setItems(JSON.parse(storedGroceryItems));
        }
    }, [setItems]);

    const addItem = () => {
        if (newItem.trim() !== '') {
            setItems([...items, { name: newItem.trim(), crossed: false }]);
            setNewItem('');
        }
    };

    const toggleItem = (index) => {
        const updatedItems = [...items];
        updatedItems[index].crossed = !updatedItems[index].crossed;
        setItems(updatedItems);
    };

    const removeItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const deleteAllItems = () => {
        setItems([]);
    };

    // Save grocery items to local storage whenever 'items' changes
    useEffect(() => {
        localStorage.setItem('groceryItems', JSON.stringify(items));
    }, [items]);

    return (
        <div className="grocery-container">
            <h1>Grocery List</h1>
            <div className="input-section">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter new item"
                />
                <button onClick={addItem}>Add</button>
            </div>
            {items.length === 0 ? (
                <p className="empty-list-message">There is nothing on your list!</p>
            ) : (
                <ul className="grocery-list">
                    {items.map((item, index) =>
                        JSON.parse(item.name).map((ingredient, idx) => (
                            <li key={index + idx} className={item.crossed ? 'crossed-out' : ''}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={item.crossed}
                                        onChange={() => toggleItem(index)}
                                    />
                                    {ingredient.trim()}
                                </label>
                                {item.crossed && (
                                    <button onClick={() => removeItem(index)}>Remove</button>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            )}
            <DeleteBtn onDelete={deleteAllItems} />
        </div>
    );
};

GroceryList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            crossed: PropTypes.bool.isRequired,
        })
    ).isRequired,
    setItems: PropTypes.func.isRequired,
};

export default GroceryList;