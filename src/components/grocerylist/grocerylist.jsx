// import { useState } from 'react';
// import './grocerylist.css';
// import DeleteBtn from '../deletebtn/deletebtn';

// const GroceryList = () => {
//     const [items, setItems] = useState([]);
//     const [newItem, setNewItem] = useState('');

//     const addItem = () => {
//         if (newItem.trim() !== '') {
//             setItems([...items, { name: newItem.trim(), crossed: false }]);
//             setNewItem('');
//         }
//     };

//     const toggleItem = (index) => {
//         const updatedItems = [...items];
//         updatedItems[index].crossed = !updatedItems[index].crossed;
//         setItems(updatedItems);
//     };

//     const deleteAllItems = () => {
//         setItems([]); // This function deletes all the items by setting the state to an empty array.
//     };

//     return (
//         <div className="grocery-container">
//             <h1>Grocery List</h1>
//             <div className="input-section">
//                 <input
//                     type="text"
//                     value={newItem}
//                     onChange={(e) => setNewItem(e.target.value)}
//                     placeholder="Enter new item"
//                 />
//                 <button onClick={addItem}>Add</button>
//             </div>
//             {items.length === 0 ? (
//                 <p className="empty-list-message">There is nothing on your list!</p>
//             ) : (
//                 <ul className="grocery-list">
//                     {items.map((item, index) => (
//                         <li
//                             key={index}
//                             className={item.crossed ? 'crossed-out' : ''}
//                             onClick={() => toggleItem(index)}
//                         >
//                             {item.name}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             <DeleteBtn onDelete={deleteAllItems} />
//         </div>
//     );
// };

// export default GroceryList;

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