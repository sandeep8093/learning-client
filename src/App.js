import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile';
import Leaderboard from './components/Leaderboard';
import LanguageComponent from './components/LanguageComponent';
import ExerciseComponent from './components/ExerciseComponent';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

function App() {
  const user = useSelector(state => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Router>
      <div>
        {isLoading && <Loader />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/languages" element={<LanguageComponent />} />
          <Route path="/exercises" element={<ExerciseComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
