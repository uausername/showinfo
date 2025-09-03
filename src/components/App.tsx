import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import ShowPage from "./ShowPage";

const App: React.FC = () => (
  <Router>
    <nav>
      <Link to="/">Home</Link>
    </nav>
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:name" element={<ShowPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
