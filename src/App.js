import React, { useState } from "react";
import Form from "./component/Form";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tables from "./component/Tables";

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/tables" element={<Tables/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
