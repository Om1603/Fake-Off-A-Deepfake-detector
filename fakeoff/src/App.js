import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatIsFakeOff from './components/WhatIsFakeOff';
import Detection from './components/Detection';
import WhatWeOffer from './components/WhatWeOffer';
import Footer from './components/Footer';
import './styles/global.css';

const Home = () => (
  <>
    <Hero />
    <WhatIsFakeOff />
    <WhatWeOffer />
  </>
);

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detection" element={<Detection />} />
      </Routes>
      
    </Router>
  );
};

export default App;
