import React from "react";
import "./App.css";
import { GoogleSearchEngine } from "./Components/GoogleSearchEngine";
import { Routes, Route } from "react-router-dom";
import { GoogleSearchResults } from "./Components/GoogleSearchResults";
function App() {
  return (
    <div className="App">
      <h1>Hello React</h1>
      <Routes>
        <Route path="/" element={<GoogleSearchEngine />}></Route>
        <Route path="/search" element={<GoogleSearchResults />}></Route>
      </Routes>
    </div>
  );
}
export default App;
