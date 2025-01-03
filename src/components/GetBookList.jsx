import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const GetBookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0);

    const fetchBooks = async (offset) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token is not available in localStorage");
            } else {
                console.log("Authorization Token:", token);
            }
            const response = await axios.get("https://railway.bookreview.techtrain.dev/books", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                    offset,
                },
            });
            setBooks(response.data);
            setError("");
        } catch (err) {
            setError(err.response?.data?.ErrorMessageJP || "データの取得に失敗しました。");
        }
    };

    useEffect(() => {
        fetchBooks(offset);
    }, [offset]);

    const  handleNext = () => {
        setOffset(offset + 10);
    };

    const handlePrev = () => {
        if(offset > 0){
            setOffset(offset - 10);
        }
    };

    return (
        <div className="book-list">
            <h1 className="book-list_title">書籍レビュー一覧</h1>
            {error && <p className="book-list_error">{error}</p>}
            <ul className="book-list_items">
                {books.map((book) => (
                    <li key={book.id} className="book-list_item">
                        <h2 className="book-list_item-title">{book.title}</h2>
                        <p className="book-list_item-detail">{book.detail}</p>
                        <p className="book-list_item-reviewer">レビュー者： {book.reviewer}</p>
                        <p className="book-list_item-review">レビュー: {book.review}</p>
                        <a
                            href={book.url}
                            className="book-list_item-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            詳細を見る
                        </a>
                    </li>
                ))}
                <Pagination
                    offset={offset}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            </ul>
        </div>
    );
};

export default GetBookList;
