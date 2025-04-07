import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

function LoginPage({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      navigate('/home');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="logo.png" alt="Logo" className="logo" />
        <h2>Giriş Yap</h2>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Giriş Yap
        </button>
      </div>
    </div>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="main-container">
      <div className="toolbar">
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>

      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>Profil</li>
          <li>Ayarlar</li>
          <li>Çıkış</li>
        </ul>
      </div>

      <div className="content">
        <h2>Haftalık Program</h2>

        <table className="week-table">
          <thead>
            <tr>
              <th>Pazartesi</th>
              <th>Salı</th>
              <th>Çarşamba</th>
              <th>Perşembe</th>
              <th>Cuma</th>
              <th>Cumartesi</th>
              <th>Pazar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
            </tr>
            <tr>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
            </tr>
            <tr>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
            </tr>
            <tr>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
            </tr>
            <tr>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
              <td><div className="day-slot"></div></td>
            </tr>
          </tbody>
        </table>

        <div className="chat-box">
          <textarea placeholder="Yazınızı buraya yazın..." rows="4"></textarea>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
