import React from "react";
import { Sidebar } from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Favoritepage from "./pages/Favoritepage";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/favorite" element={<Favoritepage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
