import React, { useState, useEffect, useRef } from 'react';
import '../styles/WhatIsFakeOff.css';
import logoImage from '../assets/fak2.png'; // Make sure this path is correct

const WhatIsFakeOff = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Set visibility to true
            observer.unobserve(currentRef); // Stop observing after animation
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="what-is-fakeoff"
      className={`what-is-fakeoff ${isVisible ? 'in-view' : ''}`}
      ref={sectionRef}
    >
      <div className="fakeoff-text">
        <h2>
          What is{" "}
          <span className="fakeoff-highlight">
            <span className="underline-animation">FakeOff</span>
            <span className="question-mark">?</span>
          </span>
        </h2>
        <p>
          FakeOff is an AI-powered deepfake detection platform designed to help users identify manipulated images with accuracy and ease.
          <br /><br />
          As deepfake technology evolves, so does the risk of misinformation and digital fraud. FakeOff leverages advanced machine learning to analyze images and detect signs of manipulation, providing users with a confidence score to assess authenticity.
          <br /><br />
          We are committed to improving our detection capabilities by continuously refining our algorithms and expanding support for videos and live detection.
          <br /><br />
          Join us in the fight against digital deception.
          <br /><br />
          <a href="/detection" className="btn">Try FakeOff today</a>
        </p>
      </div>
      <div className="fakeoff-demo">
        <img src={logoImage} alt="FakeOff Logo" className="logo-image" />
      </div>
    </section>
  );
};

export default WhatIsFakeOff;