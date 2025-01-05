import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import "./GetBookList.css";

const GetBookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);

  const fetchBooks = async (offset) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://railway.bookreview.techtrain.dev/books", {
        headers: { Authorization: `Bearer ${token}` },
        params: { offset },
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

  return (
    <div className="book-list">
      <h1 className="book-list__title">書籍レビュー一覧</h1>
      {error && <p className="book-list__error">{error}</p>}
      <ul className="book-list__items">
        {books.map((book) => (
          <li key={book.id} className="book-list__item">
            <h2 className="book-list__item-title">{book.title}</h2>
            <p className="book-list__item-detail">{book.detail}</p>
            <p className="book-list__item-reviewer">レビュー者: {book.reviewer}</p>
            <p className="book-list__item-review">レビュー: {book.review}</p>
            <a href={book.url} className="book-list__item-link" target="_blank" rel="noopener noreferrer">
              詳細を見る
            </a>
          </li>
        ))}
      </ul>
      <Pagination offset={offset} onNext={() => setOffset(offset + 10)} onPrev={() => setOffset(offset - 10)} />
    </div>
  );
};

export default GetBookList;
