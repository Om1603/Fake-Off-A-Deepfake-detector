import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".header")) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header
      className={`header ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event from reaching document
        isMobile && setIsExpanded(!isExpanded);
      }}
    >
      <div className="header-container">
        <div className={`logo-text ${isExpanded ? "hidden" : ""}`}>Fake Off</div>
      </div>

      {/* Navigation Menu */}
      <nav className={`header-nav ${isExpanded ? "show" : ""}`}>
        <ul>
          <li>
            <a href="/#what-is-fakeoff">What is FakeOff?</a>
          </li>
          <li>
            <a href="/detection">Deepfake Detection</a>
          </li>
          <li>
            <a href="/#what-we-offer">What We Offer</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
