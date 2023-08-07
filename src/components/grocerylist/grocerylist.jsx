import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './grocerylist.css';
import DeleteBtn from '../deletebtn/deletebtn';
import PopUp from '../deletebtn/PopUp';

const GroceryList = ({ items, setItems, likedIngredients }) => {
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const storedGroceryItems = localStorage.getItem('groceryItems');
        if (storedGroceryItems) {
            setItems(JSON.parse(storedGroceryItems));
        }
    }, [setItems]);

    const deleteAllItems = () => {
        setShowDialog(true);
    };

    const handleConfirm = () => {
        setItems([]);
        setShowDialog(false);
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    useEffect(() => {
        localStorage.setItem('groceryItems', JSON.stringify(items));
    }, [items]);

    const addItem = () => {
        if (newItem.trim() !== '') {
            setItems([...items, { name: newItem.trim() }]);
            setNewItem('');
        }
    };

    const [newItem, setNewItem] = useState('');

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
            {items.length === 0 && likedIngredients.length === 0 ? (
                <p className="empty-list-message">There is nothing on your list!</p>
            ) : (
                <div className="grocery-items">
                    {items.map((item, index) => (
                        <div key={index} className="grocery-item">
                            {item.name}
                            <button onClick={() => setItems([...items.slice(0, index), ...items.slice(index + 1)])}>
                                Remove
                            </button>
                        </div>
                    ))}
                    {likedIngredients.length > 0 && (
                        <div className="liked-ingredients">
                            <h2>Liked Ingredients</h2>
                            {likedIngredients.map((ingredient, index) => (
                                <div key={index} className="liked-ingredient">
                                    {ingredient}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {items.length > 0 && (
                <DeleteBtn onDelete={deleteAllItems} />
            )}
            {showDialog && <PopUp onConfirm={handleConfirm} onCancel={handleCancel} setShowDialog={setShowDialog} />}
        </div>
    );
};

GroceryList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    setItems: PropTypes.func.isRequired,
    likedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GroceryList;