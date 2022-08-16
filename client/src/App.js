import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calendar from "./components/Calendar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import VideoCall from "./components/VideoCall";

function App() {
  return (
      <Router>
          <Link to="/"> Home </Link>
          <Link to="/profile"> Profile</Link>
          <Link to="/login"> Login</Link>
          <Link to="/videocall">Video Call</Link>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/videocall" element={<VideoCall />} />
        </Routes>
      </Router>
  );
}

export default App;
