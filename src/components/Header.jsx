import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem("name") || "");
  const [userIcon, setUserIcon] = useState("");  // ユーザーアイコンの状態を追加
  const [errorMessage, setErrorMessage] = useState("");  // エラーメッセージの状態

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      axios
        .get("https://railway.bookreview.techtrain.dev/users", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((res) => {
          console.log("ユーザー情報:", res.data);
          const { name, iconUrl } = res.data;
          setUserName(name);  // ユーザー名を更新
          setUserIcon(iconUrl || "");  // アイコンURLを更新、存在しない場合は空文字
          localStorage.setItem("name", name);  // localStorage に保存
        })
        .catch((err) => {
          console.error("API エラー:", err);
          setErrorMessage("ユーザー情報の取得に失敗しました");
        });
    } else {
      console.warn("トークンが存在しません。ログインしていない可能性があります。");
      setErrorMessage("ログインしていないため、情報を取得できません。");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken(null);
    setUserName("");  // ログアウト時にユーザー名をクリア
    setUserIcon("");  // アイコンもクリア
    navigate("/login");
  };

  return (
    <header className="header">
      <h1 className="title" onClick={() => navigate("/")}>書籍レビューアプリ</h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">ホーム</Link></li>
          <li><Link to="/booklist">書籍レビュー一覧</Link></li>
          {token ? (
            <>
              <li><Link to="/mypage">マイページ</Link></li>
              <li><Link to="/profile">プロフィール編集</Link></li>
              <li><Link to="/new">書籍投稿</Link></li> {/* 書籍投稿へのリンクを追加 */}
              {errorMessage ? (
                <p>{errorMessage}</p>  // エラーメッセージの表示
              ) : (
                <>
                  {userIcon && <img src={userIcon} alt="ユーザーアイコン" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />}
                  <span className="userName">{userName} さん</span>
                </>
              )}
              <button onClick={handleLogout} className="button">ログアウト</button>
            </>
          ) : (
            <>
              <li><Link to="/login">ログイン</Link></li>
              <li><Link to="/signup">新規登録</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;