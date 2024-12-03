import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DiscussionsPage from './pages/DiscussionsPage';
import Account from './pages/Account';
import './App.css';
// npm install react-router-dom
const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/discussions">Discussions</Link>
                    </li>
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discussions" element={<DiscussionsPage />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </Router>
    );
};

export default App;
