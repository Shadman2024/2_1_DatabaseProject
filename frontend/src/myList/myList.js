import React, { useState, useEffect } from 'react';
import styles from './myList.module.css';
import defaultImage from '../Item/itemMini.webp';
function ItemList() {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        price: '',
        status: '',
        category_name: '',
        subcategory_name: '',
        image_url: '',
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/myList/items`, {
                method: 'GET',
                headers: {
                    token: localStorage.token,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:5000/myList/items/${itemId}`, {
                method: 'DELETE',
                headers: {
                    token: localStorage.token,
                },
            });
            if (!response.ok) throw new Error('Failed to delete item');
            setItems(prevItems => prevItems.filter(item => item.item_id !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const editItem = (item) => {
        setEditingItem(item.item_id);
        setEditFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            status: item.status,
            category_name: item.category_name,
            subcategory_name: item.subcategory_name,
            image_url: item.image_url,
        });
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/myList/items/${editingItem}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.token,
                },
                body: JSON.stringify(editFormData),
            });
            if (!response.ok) throw new Error('Failed to update item');

            const updatedItem = await response.json();
            setItems(prevItems => prevItems.map(item => item.item_id === editingItem ? updatedItem : item));
            setEditingItem(null);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className={styles.listContainer}>
            <div className={styles.title}>Listed Items</div>
            {items.length > 0 ? (
                <ul >
                    {items.map((item) => (
                        <li key={item.item_id} >
                            {editingItem === item.item_id ? (
                                <form onSubmit={handleEditFormSubmit} >
                                    {/* <div className={styles.image}>
                                        <img src={item.image_url || defaultImage} alt={item.name} className={styles.itemImage} />
                                    </div> */}
                                    <div className={styles.detailsContainer}>
                                        <div className={styles.details}>
                                            <div className={styles.test}>
                                                <strong>Name:</strong>
                                                <input className={styles.text} type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} />
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Description: </strong>
                                                <input className={styles.text} type="text" name="description" value={editFormData.description} onChange={handleEditFormChange} />
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Price:</strong>
                                                <input className={styles.text} type="number" name="price" value={editFormData.price} onChange={handleEditFormChange} />
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Status:</strong>
                                                <select className={styles.text} name="status" value={editFormData.status} onChange={handleEditFormChange}>
                                                    <option value="available">Available</option>
                                                    <option value="sold">Sold</option>
                                                </select>
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Category:</strong>
                                                <div className={styles.text}> {item.category_name}</div>
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Subcategory:</strong>
                                                <div className={styles.text}> {item.subcategory_name}</div>
                                            </div>
                                        </div>
                                        <div className={styles.buttons}>
                                            <button type="submit" className={styles.animated_button}>Save</button>
                                            <button onClick={() => setEditingItem(null)} className={styles.animated_button}>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className={styles.image}>
                                        <img src={item.image_url || defaultImage} alt={item.name} className={styles.itemImage} />
                                    </div>
                                    <div className={styles.detailsContainer}>
                                        <div className={styles.details}>
                                            <div className={styles.test}>
                                                <strong>Name:</strong>
                                                <div className={styles.text}> {item.name}</div>
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Description: </strong>
                                                <div className={styles.text}>{item.description}</div>
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Price:</strong>
                                                <div className={styles.text}> ${item.price}</div>
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Status:</strong>
                                                <div className={styles.text}> {item.status}</div>
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Category:</strong>
                                                <div className={styles.text}> {item.category_name}</div>
                                            </div>
                                            <div className={styles.test}>
                                                <strong>Subcategory:</strong>
                                                <div className={styles.text}> {item.subcategory_name}</div>
                                            </div>
                                        </div>
                                        <div className={styles.buttons}>
                                            <button onClick={() => editItem(item)} className={styles.animated_button}>Edit</button>
                                            <button onClick={() => deleteItem(item.item_id)} className={styles.animated_button}>Delete</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items listed.</p>
            )}
        </div>
    );
}

export default ItemList;
