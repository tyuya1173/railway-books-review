import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostBookReview = () => {
    // 各入力フィールドの状態を管理
    const [bookTitle, setBookTitle] = useState(""); // 書籍タイトルの状態
    const [bookUrl, setBookUrl] = useState(""); // 書籍URLの状態
    const [bookDetail, setBookDetail] = useState(""); // 書籍詳細の状態
    const [review, setReview] = useState(""); // 書籍レビューの状態
    const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージの状態
    const [successMessage, setSuccessMessage] = useState(""); // 成功メッセージの状態
    const navigate = useNavigate(); // ページ遷移用のフック

    // レビュー投稿処理
    const postReview = (event) => {
        event.preventDefault(); // フォーム送信時のページリロードを防ぐ

        const token = localStorage.getItem("token"); // ローカルストレージから認証トークンを取得

        if (!token) {
            // トークンがない場合はエラーメッセージを表示して処理を中断
            setErrorMessage("ログインしていません。");
            return;
        }

        // 送信するデータをオブジェクトとして作成
        const data = {
            title: bookTitle, // 書籍タイトル
            url: bookUrl, // 書籍URL
            detail: bookDetail, // 書籍詳細
            review: review // 書籍レビュー
        };

        // APIリクエストを送信
        axios
            .post("https://railway.bookreview.techtrain.dev/books", data, {
                headers: {
                    Authorization: `Bearer ${token}`, // 認証ヘッダーを追加
                    "Content-Type": "application/json" // JSONデータを送信
                }
            })
            .then(() => {
                // 成功時の処理
                setSuccessMessage("書籍レビューが正常に投稿されました。"); // 成功メッセージを設定
                setErrorMessage(""); // エラーメッセージをクリア

                // 2秒後に書籍一覧画面へ遷移
                setTimeout(() => {
                    navigate("/booklist");
                }, 2000);
            })
            .catch((err) => {
                // エラー発生時の処理
                setErrorMessage(`書籍レビューの投稿に失敗しました: ${err.response?.data?.message || err.message}`);
                setSuccessMessage(""); // 成功メッセージをクリア
            });
    };

    return (
        <div>
            <h2>書籍レビュー投稿</h2>

            {/* エラーメッセージを表示 */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {/* 成功メッセージを表示 */}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

            {/* 書籍レビュー投稿フォーム */}
            <form onSubmit={postReview}>
                <div>
                    <label>書籍タイトル:</label>
                    <input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        required // 必須入力
                    />
                </div>
                <div>
                    <label>書籍URL:</label>
                    <input
                        type="text"
                        value={bookUrl}
                        onChange={(e) => setBookUrl(e.target.value)}
                        required // 必須入力
                    />
                </div>
                <div>
                    <label>詳細:</label>
                    <textarea
                        value={bookDetail}
                        onChange={(e) => setBookDetail(e.target.value)}
                        required // 必須入力
                    />
                </div>
                <div>
                    <label>レビュー:</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required // 必須入力
                    />
                </div>
                <button type="submit">レビューを投稿する</button>
            </form>
        </div>
    );
};

export default PostBookReview;