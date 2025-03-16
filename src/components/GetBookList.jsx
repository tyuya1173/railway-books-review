// GetBookList.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";  // useNavigate をインポート
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Link をインポート
import "./GetBookList.css";

const GetBookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();  // navigate を使用して遷移

  const initialOffset = parseInt(searchParams.get("offset"), 10) || 0;
  const [offset, setOffset] = useState(initialOffset);

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
    setSearchParams({ offset });
    fetchBooks(offset);
  }, [offset, setSearchParams]);

  // 編集画面へ遷移
  const handleEditClick = (id) => {
    console.log("編集ページに遷移:", id);  // デバッグ用
    navigate(`/edit/${id}`);  // 編集ページに遷移
  };

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
            
            {/* 詳細を見るリンクを Link コンポーネントに変更 */}
            <Link to={`/detail/${book.id}`} className="book-list__item-link">
              詳細を見る
            </Link>

            {/* ログインユーザーと一致する場合に編集ボタンを表示 */}
            {localStorage.getItem("name") === book.reviewer && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();  // イベントのバブリングを停止
                  handleEditClick(book.id);  // 編集ボタンのクリック
                }} 
                className="book-list__edit-button"
              >
                編集
              </button>
            )}
          </li>
        ))}
      </ul>
      <Pagination offset={offset} onNext={() => setOffset(offset + 10)} onPrev={() => setOffset(offset - 10)} />
      
      {/* 投稿画面へのリンクを追加 */}
      <button className="book-list__post-button" onClick={() => navigate("/new")}>
        新規書籍レビューを投稿する
      </button>
    </div>
  );
};

export default GetBookList;