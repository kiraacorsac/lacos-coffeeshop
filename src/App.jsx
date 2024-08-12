import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import CoffeShop from "./CoffeShop";
import Charts from "./Charts";

function App() {
    return (
        <>
          <Router>
            <nav>
              <Link to="/">Coffe Shop</Link>
              <Link to="/charts/">Charts</Link>
            </nav>
            <Routes>
              <Route path="/" element={<CoffeShop />}></Route>
              <Route path="/charts/" element={<Charts />}></Route> 
   
            </Routes>
          </Router>
      
        </>
      );
}
export default App