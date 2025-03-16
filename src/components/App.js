import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
