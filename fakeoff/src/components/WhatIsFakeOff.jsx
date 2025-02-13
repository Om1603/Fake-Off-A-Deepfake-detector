import React, { useEffect, useRef } from 'react';
import '../styles/WhatIsFakeOff.css';
import logoImage from '../assets/Fake.png'; // Make sure this path is correct

const WhatIsFakeOff = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentRef.classList.add("in-view");
          } else {
            currentRef.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.5 }
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
    <section id="what-is-fakeoff" className="what-is-fakeoff" ref={sectionRef}>
      <div className="fakeoff-text">
        <h2>
          What is{" "}
          <span className="fakeoff-highlight">
            <span className="underline-animation">FakeOff</span>
            <span className="question-mark">?</span>
          </span>
        </h2>
        <p>
          FakeOff is a leading deepfake detection service that leverages advanced AI to safeguard digital content. Our mission is to protect individuals and organizations from the growing threat of deepfake technology.
          <br /><br />
          By continuously evolving our detection algorithms, we provide state-of-the-art protection against multimedia manipulation. Join us in the fight against digital misinformation and help secure a trusted digital future.
        </p>
      </div>
      <div className="fakeoff-demo">
        <img src={logoImage} alt="FakeOff Logo" className="logo-image" />
      </div>
    </section>
  );
};

export default WhatIsFakeOff;
