import React from 'react';
import { motion } from 'framer-motion';
import '../styles/WhatWeOffer.css';

const WhatWeOffer = () => {
    const offers = [
        {
            title: "Real-Time Detection",
            description: "Instant analysis of media to identify deepfakes.",
        },
        {
            title: "High Accuracy",
            description: "State-of-the-art algorithms ensure reliable results.",
        },
        {
            title: "User-Friendly",
            description: "Simple interface for easy use by everyone.",
        },
    ];

    return (
        <section id="what-we-offer" className="what-we-offer">
            <div className="container">
                <h2 className="animate__animated animate__fadeIn">What We Offer</h2>
                <div className="offer-grid">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={index}
                            className="offer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3>{offer.title}</h3>
                            <p>{offer.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;