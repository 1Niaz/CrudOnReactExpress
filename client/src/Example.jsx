import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });
    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/books", book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true)
        }
    };

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input
                type="text"
                placeholder="Book title"
                name="title"
                onChange={handleChange}
            />
            <textarea
                rows={5}
                type="text"
                placeholder="Book desc"
                name="desc"
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Book price"
                name="price"
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Book cover"
                name="cover"
                onChange={handleChange}
            />
            <button onClick={handleClick}>Add</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Add;


import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    console.log(books);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/books/${id}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Lama Book Shop</h1>
            <div className="books">
                {books.map((book) => (
                    <div key={book.id} className="book">
                        <img src={book.cover} alt="" />
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>${book.price}</span>
                        <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className="update">
                            <Link
                                to={`/update/${book.id}`}
                                style={{ color: "inherit", textDecoration: "none" }}
                            >
                                Update
                            </Link>
                        </button>
                    </div>
                ))}
            </div>

            <button className="addHome">
                <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
                    Add new book
                </Link>
            </button>
        </div>
    );
};

export default Books;




import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });
    const [error, setError] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const bookId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8800/books/${bookId}`, book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1>Update the Book</h1>
            <input
                type="text"
                placeholder="Book title"
                name="title"
                onChange={handleChange}
            />
            <textarea
                rows={5}
                type="text"
                placeholder="Book desc"
                name="desc"
                onChange={handleChange}
            />
            <input
                type="number"
                placeholder="Book price"
                name="price"
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Book cover"
                name="cover"
                onChange={handleChange}
            />
            <button onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Update;

















