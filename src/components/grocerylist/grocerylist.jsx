import { useState } from 'react';
import './grocerylist.css';
import DeleteBtn from '../deletebtn/deletebtn';

const GroceryList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

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
        setItems([]); // This function deletes all the items by setting the state to an empty array.
    };

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
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={item.crossed ? 'crossed-out' : ''}
                            onClick={() => toggleItem(index)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
            <DeleteBtn onDelete={deleteAllItems} />
        </div>
    );
};

export default GroceryList;