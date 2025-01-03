import React from "react";

const BookList = ({ books }) => {
    return (
        <ul className="book-list">
            {books.map((book) => (
                <li key={book.id} className="book-item">
                    <h2>{book.title}</h2>
                    <p>{book.detail}</p>
                    <p>レビュー者: {book.reviewer}</p>
                    <p>レビュー: {book.review}</p>
                    <a href={book.url} target="_blank" rel="noopener noreferrer">
                        詳細を見る
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default BookList;
