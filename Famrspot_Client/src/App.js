import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Views Imports
import Home from "./views/HomeBuyers";
import Contact from "./views/Contact";
import About from "./views/About";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import HomeSellers from "./views/HomeSellers";
import LocationsNearMe from "./views/LocationsNearMe";
import ProductDetails from "./views/ProductDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sell" element={<HomeSellers />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/near-me" element={<LocationsNearMe/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
