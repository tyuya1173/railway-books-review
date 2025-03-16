import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBookReview = () => {
  const { id } = useParams(); // URLパラメータから書籍のIDを取得
  const navigate = useNavigate(); // ページ遷移用フック
  const [book, setBook] = useState({ title: '', review: '', detail: '', url: '' }); // 書籍情報の状態
  const [error, setError] = useState(''); // エラーメッセージの状態
  const token = localStorage.getItem('token'); // ローカルストレージからトークンを取得

  useEffect(() => {
    // 書籍情報を取得する非同期関数
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // 認証ヘッダーを追加
        });
        setBook(response.data); // 取得したデータを状態にセット
      } catch (err) {
        setError('書籍情報の取得に失敗しました'); // エラーメッセージを設定
      }
    };

    fetchBookDetails();
  }, [id, token]); // id または token が変更されたときに実行

  // フォーム送信時の処理（書籍情報の更新）
  const handleSubmit = async (e) => {
    e.preventDefault(); // フォーム送信時のページリロードを防ぐ

    try {
      await axios.put(
        `https://railway.bookreview.techtrain.dev/books/${id}`,
        {
          title: book.title, // 更新するタイトル
          review: book.review, // 更新するレビュー
          detail: book.detail, // 更新する詳細
          url: book.url, // 更新するURL
        },
        { headers: { Authorization: `Bearer ${token}` } } // 認証ヘッダーを追加
      );
      navigate(`/booklist`); // 更新後、書籍リストにリダイレクト
    } catch (err) {
      setError('書籍の更新に失敗しました'); // エラーメッセージを設定
    }
  };

  // 入力フィールドの変更を状態に反映
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  // 書籍の削除処理
  const handleDelete = async () => {
    const confirmDelete = window.confirm("この書籍を削除してもよろしいですか?"); // ユーザーに確認ダイアログを表示
    if (!confirmDelete) return; // ユーザーがキャンセルした場合は処理を中断

    try {
      await axios.delete(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // 認証ヘッダーを追加
      });
      navigate('/booklist'); // 削除後、書籍リストにリダイレクト
    } catch (err) {
      setError('書籍の削除に失敗しました'); // エラーメッセージを設定
    }
  };

  return (
    <div>
      <h1>書籍レビューの編集</h1>
      {/* エラーメッセージを表示 */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* 書籍情報編集フォーム */}
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
        {/* 更新ボタン */}
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