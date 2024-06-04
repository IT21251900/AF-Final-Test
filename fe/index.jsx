
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('/books').then(response => {
            setBooks(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Available Books</h1>
            <ul>
                {books.map(book => {
                    return <li key={book.id}>
                        {book.title} by {book.author}
                        {book.available ? 'In stock' : 'Out of Stock'}
                        price = {book.price}
                        </li>;
                })}
            </ul>
        </div>
    );
};

export default HomePage;


{/* b). */}

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        axios.get(`books/search?q=${query}`).then((response) => {
            setResults(response.data);
        });
    };

    return (
        <div>
            <h1>Search Books</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((book) => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;

// c).

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`/books/${id}`).then(response => {
            setBook(response.data);
        });
    }, [id]);

    const handlePurchase = () => {
        axios.post(`/books/purchase/${id}`).then(response => {
            alert('Purchase successful');
        }).catch(error => {
            alert('Purchase failed');
        });
    };

    if (!book) return <div>Loading ...</div>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>Availability: {book.available ? 'In stock' : 'Out of Stock'}</p>
            <button onClick={handlePurchase} disabled={!book.available}>
                Purchase
            </button>
        </div>
    );
};

export default BookDetailsPage;

// d).

import React, { useState, useEffect } from 'react';

const ShoppingCartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Get cart items from session storage and update the state
        const storedCartItems = sessionStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const handleRemoveItem = (itemId) => {
        // Remove item from the cart and update the state
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
        // Update session storage with the updated cart items
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handlePurchase = () => {
        axios.post(`books/purchase/${id}`).then(response => {
          alert('Purchase sucessfull');
        }).catch(error =>{
          alert('Purchase failed');
        });
       };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <span>{item.price}</span>
                            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
           <button onClick ={handlePurchase} disabled={!book.available}>
     Purchase
   </button>
        </div>
    );
};

export default ShoppingCartPage;
