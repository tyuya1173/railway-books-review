import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyPage = () => {
    const url = "https://railway.bookreview.techtrain.dev/users";
    const [userInfo, setUserInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log("API レスポンス:", res.data);

                    if (res.data.name) {
                        setUserInfo(res.data);
                    } else {
                        setErrorMessage("ユーザー名が取得できませんでした。");
                    }
                })
                .catch((err) => {
                    console.error("API エラー:", err);

                    if (err.response) {
                        // サーバからのエラーレスポンスがある場合
                        const { ErrorCode, ErrorMessageJP } = err.response.data;
                        setErrorMessage(`エラー: ${ErrorCode} - ${ErrorMessageJP}`);
                    } else {
                        // その他のエラー
                        setErrorMessage(`ユーザー情報の取得に失敗しました: ${err.message}`);
                    }
                });
        } else {
            console.warn("トークンが存在しません。ログインしていない可能性があります。");
            setErrorMessage("ログインしていないため、情報を取得できません。");
        }
    }, []);

    return (
        <div>
            <header>
                <Link to = "/components/Profile">プロフィール編集</Link>
            </header>
            <main className="my-page">
                <h2>マイページ</h2>
                {errorMessage && <p>{errorMessage}</p>}
                {userInfo ? (
                    <div>
                        <p>ユーザー名: {userInfo.name}</p>
                        {userInfo.iconUrl ? (
                            <img
                                src={userInfo.iconUrl}
                                alt="アイコン"
                                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                            />
                        ) : (
                            <p>アイコン画像がありません。</p>
                        )}
                    </div>
                ) : (
                    <p>読み込み中...</p>
                )}
            </main>
        </div>
    );
};

export default MyPage;
