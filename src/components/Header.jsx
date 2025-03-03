import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken(null);
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
              <span className="userName">{userName}さん</span>
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