import React from 'react';

const ParallaxWrapper = ({ children }) => {
  return (
    <div className="parallax-wrapper">
      <div className="parallax-layer"></div>
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default ParallaxWrapper;
