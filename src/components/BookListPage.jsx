import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage } from "./store";
import axios from "axios";
import BookList from "./components/BookList";
import Pagination from "./components/Pagination";

const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const offset = useSelector((state) => state.pagination.offset);
    const dispatch = useDispatch();

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("https://railway.bookreview.techtrain.dev/books", {
                headers: {
                    Authorization: `Bearer ${token}`,
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
        fetchBooks();
    }, [offset]);

    return (
        <div className="book-list-page">
            <h1>書籍レビュー一覧</h1>
            {error && <p className="error">{error}</p>}
            <BookList books={books} />
            <Pagination
                offset={offset}
                onNext={() => dispatch(nextPage())}
                onPrev={() => dispatch(prevPage())}
            />
        </div>
    );
};

export default BookListPage;
