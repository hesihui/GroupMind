import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MeetingCalendar from "./components/Calendar/MeetingCalendar";
import Profile from "./components/Profile";
import Login from "./components/Login";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
      <Router>
        <nav>
            {!isAuth ? (
              <Link to="/login"> Login </Link>
            ) : (
              <>
                  <Link to="/"> Home </Link>
                  <Link to="/profile"> Profile</Link>
                  <button onClick={signUserOut}> Log Out</button>
              </>
            )}
      </nav>
        <Routes>
              <Route path="/" element={<MeetingCalendar />} />
              <Route path="/profile" element={ <Profile /> } />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
  );
}

export default App;
