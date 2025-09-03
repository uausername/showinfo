import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <div>
    <h1>Showinfo</h1>
    <p>Select a show to explore.</p>
    <ul>
      <li><Link to="/show/south-park">South Park</Link></li>
      <li><Link to="/show/bobs-burgers">Bob's Burgers</Link></li>
      <li><Link to="/show/family-guy">Family Guy</Link></li>
    </ul>
  </div>
);

export default Home;
