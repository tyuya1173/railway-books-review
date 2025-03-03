import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBookReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', review: '', detail: '', url: '' });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // 書籍情報を取得する
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBook(response.data);
      } catch (err) {
        setError('書籍情報の取得に失敗しました');
      }
    };

    fetchBookDetails();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://railway.bookreview.techtrain.dev/books/${id}`,
        {
          title: book.title,
          review: book.review,
          detail: book.detail,
          url: book.url,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/booklist`);
    } catch (err) {
      setError('書籍の更新に失敗しました');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  // 削除機能
  const handleDelete = async () => {
    const confirmDelete = window.confirm("この書籍を削除してもよろしいですか?");
    if (!confirmDelete) return;  // ユーザーが削除をキャンセルした場合は何もしない

    try {
      await axios.delete(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/booklist'); // 削除後、書籍リストにリダイレクト
    } catch (err) {
      setError('書籍の削除に失敗しました');
    }
  };

  return (
    <div>
      <h1>書籍レビューの編集</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>書籍タイトル:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>レビュー:</label>
          <textarea
            name="review"
            value={book.review}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>詳細:</label>
          <textarea
            name="detail"
            value={book.detail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="url"
            name="url"
            value={book.url}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">更新</button>
      </form>

      {/* 削除ボタン */}
      <button onClick={handleDelete} style={{ color: "red", marginTop: "20px" }}>
        この書籍を削除
      </button>
    </div>
  );
};

export default EditBookReview;