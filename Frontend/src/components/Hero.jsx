import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h2 className="animate__animated animate__fadeIn">
          Protecting Reality in a Digital World
        </h2>
        <p className="animate__animated animate__fadeIn animate__delay-1s">
          FakeOff uses cutting-edge AI to detect and prevent deepfake content.
        </p>
        <a href="/detection" className="btn animate__animated animate__fadeIn animate__delay-2s">
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
