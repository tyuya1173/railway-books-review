import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// 書籍情報を取得する関数
const fetchBookDetails = async (id, token) => {
  try {
    const response = await axios.get(
      `https://railway.bookreview.techtrain.dev/books/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error("書籍情報の取得に失敗しました");
  }
};

// ログ送信を行う関数
const logBookSelection = async (id, token) => {
  try {
    const response = await axios.post(
      "https://railway.bookreview.techtrain.dev/logs",
      { selectBookId: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("ログ送信成功:", response);
  } catch (error) {
    console.error("ログ送信に失敗しました:", error.response ? error.response.data : error.message);
  }
};

const DetailBookReview = () => {
  const { id } = useParams();  // URL パラメータから書籍の ID を取得
  const [bookDetails, setBookDetails] = useState(null);  // 書籍情報を保存
  const [isLoading, setIsLoading] = useState(true);  // ローディング状態
  const [error, setError] = useState("");  // エラーメッセージ

  const token = localStorage.getItem("token"); // ローカルストレージからトークンを取得

  useEffect(() => {
    if (!token) {
      setError("認証トークンがありません");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // ログ送信
        await logBookSelection(id, token);
        
        // 書籍情報の取得
        const details = await fetchBookDetails(id, token);
        setBookDetails(details);
      } catch (err) {
        setError(err.message || "予期しないエラーが発生しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();  // データ取得とログ送信を行う

  }, [id, token]);  // id と token が変更されるたびに再実行

  // ローディング中はローディング UI を表示
  if (isLoading) {
    return <div>ローディング中...</div>;
  }

  // エラーが発生した場合の表示
  if (error) {
    return <div>{error}</div>;
  }

  // 詳細情報の表示
  return (
    <div className="book-detail">
      <h1 className="book-detail__title">{bookDetails.title}</h1>
      <p className="book-detail__reviewer">レビュー者: {bookDetails.reviewer}</p>
      <p className="book-detail__review">{bookDetails.review}</p>
      <p className="book-detail__detail">{bookDetails.detail}</p>
    </div>
  );
};

export default DetailBookReview;