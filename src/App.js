import React, { useState } from "react";
import axios from "axios";
import "./App.css";
//hello
export default function App() {
  const [prefs, setPrefs] = useState({
    walkability: 3,
    affordability: 3,
    safety: 3,
    nightlife: 3,
    parks: 3,
  });

  const [results, setResults] = useState([]);

  const handleChange = (key, value) => {
    setPrefs({ ...prefs, [key]: Number(value) });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/neighborhoods/match", prefs);
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching matches", err);
    }
  };

  return (
    <div className="container">
      <h1 className="main-title">🌆 NeighborFit: Match Your Neighborhood</h1>

      <div className="sliders">
        {Object.entries(prefs).map(([key, value]) => (
          <div key={key} className="slider-wrapper">
            <label className="slider-label">{key}</label>
            <input
              type="range"
              min="1"
              max="5"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="slider"
            />
            <p className="slider-value">Value: {value}</p>
          </div>
        ))}
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Find Best Neighborhoods
      </button>

      <div className="results">
        <h2 className="results-title">🔍 Top Matches</h2>
        {results.length === 0 ? (
          <p className="no-results">No results yet. Submit your preferences above.</p>
        ) : (
          <div className="results-list">
            {results.map((n, i) => (
              <div key={i} className="result-card">
                <h3 className="result-title">
                  {n.name}, {n.city}
                </h3>
                <p className="result-score">Score: {n.score.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
