import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './grocerylist.css';
import DeleteBtn from '../deletebtn/deletebtn';
import PopUp from '../deletebtn/PopUp';

const GroceryList = ({ items, setItems, onDelete }) => {
    const [newItem, setNewItem] = useState('');
    const [showDialog, setShowDialog] = useState(false);

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

    const deleteAllItems = () => {
        setShowDialog(true);
    };

    const handleConfirm = () => {
        onDelete();
        setItems([]); // This will delete all the items by setting the state to an empty array.
        setShowDialog(false);
    };

    const handleCancel = () => {
        setShowDialog(false);
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
                <div className="grocery-items">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`grocery-item ${item.crossed ? 'crossed-out' : ''}`}
                            onClick={() => toggleItem(index)}
                        >
                            {item.name
                                .replace(/[[\]]/g, '') // Remove square brackets
                                .replace(/['"]/g, '') // Remove single and double quotes
                                .split(',')
                                .map((ingredient, idx) => (
                                    <div key={idx} className="ingredient">
                                        {ingredient.trim()}
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            )}
            <DeleteBtn onDelete={deleteAllItems} />
            {showDialog && (
                <PopUp onConfirm={handleConfirm} onCancel={handleCancel} />
            )}
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
    onDelete: PropTypes.func.isRequired,
};

export default GroceryList;