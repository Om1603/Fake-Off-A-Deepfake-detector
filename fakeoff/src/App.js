import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatIsFakeOff from './components/WhatIsFakeOff';
import Detection from './components/Detection';
import WhatWeOffer from './components/WhatWeOffer';
import Footer from './components/Footer';
import './styles/global.css';

const App = () => {
    return (
        <>
            <Header />
            <Hero />
            <WhatIsFakeOff />
            <Detection />
            <WhatWeOffer />
            <Footer />
        </>
    );
};

export default App;