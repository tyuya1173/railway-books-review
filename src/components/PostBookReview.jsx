import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostBookReview = () => {
    const [bookTitle, setBookTitle] = useState("");
    const [bookUrl, setBookUrl] = useState("");  // URL入力の状態
    const [bookDetail, setBookDetail] = useState("");  // 詳細入力の状態
    const [review, setReview] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const postReview = (event) => {
        event.preventDefault();
        
        const token = localStorage.getItem("token");

        if (!token) {
            setErrorMessage("ログインしていません。");
            return;
        }

        const data = {
            title: bookTitle,
            url: bookUrl,  // URLを追加
            detail: bookDetail,  // 詳細を追加
            review: review
        };

        axios
            .post("https://railway.bookreview.techtrain.dev/books", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(() => {
                setSuccessMessage("書籍レビューが正常に投稿されました。");
                setErrorMessage("");
                setTimeout(() => {
                    navigate("/booklist"); // 投稿後に書籍一覧画面に遷移
                }, 2000);
            })
            .catch((err) => {
                setErrorMessage(`書籍レビューの投稿に失敗しました: ${err.response?.data?.message || err.message}`);
                setSuccessMessage("");
            });
    };

    return (
        <div>
            <h2>書籍レビュー投稿</h2>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={postReview}>
                <div>
                    <label>書籍タイトル:</label>
                    <input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>書籍URL:</label>
                    <input
                        type="text"
                        value={bookUrl}
                        onChange={(e) => setBookUrl(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>詳細:</label>
                    <textarea
                        value={bookDetail}
                        onChange={(e) => setBookDetail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>レビュー:</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">レビューを投稿する</button>
            </form>
        </div>
    );
};

export default PostBookReview;