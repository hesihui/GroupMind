import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calendar from "./components/Calendar";
import Profile from "./components/Profile";
import Login from "./components/Login";

function App() {
  return (
      <Router>
          <Link to="/"> Home </Link>
          <Link to="/profile"> Profile</Link>
          <Link to="/login"> Login</Link>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
