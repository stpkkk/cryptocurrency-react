//TODO add some stuff from data
//TODO styles
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Header from "./components/Header/Header";
import Exchanges from "./pages/Exchanges";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import CryptoDetails from "./pages/CryptoDetails";
import News from "./pages/News";
import Navbar from "./components/Navbar/Navbar";


const App = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <Header showSidebar={showSidebar} />
      <div className="wrapper">
        <Navbar showSidebar={showSidebar} sidebar={sidebar} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
