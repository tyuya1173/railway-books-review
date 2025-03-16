import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";

const Profile = () => {
    const url = "https://railway.bookreview.techtrain.dev/users";
    const uploadUrl = "https://railway.bookreview.techtrain.dev/uploads";
    const [userInfo, setUserInfo] = useState({ name: "", iconUrl: "" });
    const [iconFile, setIconFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

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
                    setUserInfo(res.data);
                })
                .catch(() => {
                    setErrorMessage("ユーザー情報の取得に失敗しました。");
                });
        } else {
            setErrorMessage("ログインしていないため、情報を取得できません。");
        }
    }, []);

    const compressAndUploadIcon = (file, token) => {
        new Compressor(file, {
            quality: 0.8,
            maxWidth: 800,
            success(compressedFile) {
                const formData = new FormData();
                formData.append("icon", compressedFile);

                axios
                    .post(uploadUrl, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        setUserInfo((prev) => ({ ...prev, iconUrl: res.data.iconUrl }));
                        updateUser(token);
                    })
                    .catch(() => {
                        setErrorMessage("アイコンのアップロードに失敗しました。");
                    });
            },
        });
    };

    const updateUser = (token) => {
        axios
            .put(
                url,
                { name: userInfo.name, iconUrl: userInfo.iconUrl },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                setSuccessMessage("ユーザー情報を更新しました。");
                setErrorMessage("");
                // ページをリロードして変更を反映
                window.location.reload();
            })
            .catch(() => {
                setErrorMessage("ユーザー情報の更新に失敗しました。");
                setSuccessMessage("");
            });
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (token) {
            if (iconFile) {
                compressAndUploadIcon(iconFile, token);
            } else {
                updateUser(token);
            }
        } else {
            setErrorMessage("ログイン状態が無効です。");
        }
    };

    return (
        <div>
            <main className="profile">
                <h2>ユーザー情報編集</h2>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                <form onSubmit={handleUpdate}>
                    <label>
                        ユーザー名:
                        <input
                            type="text"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        アイコン画像:
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={(e) => setIconFile(e.target.files[0])}
                        />
                    </label>
                    <br />
                    <button type="submit">更新</button>
                </form>
                <button onClick={() => navigate("/")}>一覧画面に戻る</button>
            </main>
        </div>
    );
};

export default Profile;