import React, { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <header 
            className={`header ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="header-button">
                <span className="logo-text">Fake Off</span>
            </div>
            <nav className="header-nav">
                <ul>
                    <li><a href="#what-is-fakeoff">What is FakeOff?</a></li>
                    <li><a href="#detection">Detection</a></li>
                    <li><a href="#what-we-offer">What We Offer</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;