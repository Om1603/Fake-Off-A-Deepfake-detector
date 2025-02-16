import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/WhatWeOffer.css';

const WhatWeOffer = () => {
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <section id="why-fakeoff" className="why-fakeoff" ref={sectionRef}>
            <div className="container">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Why <span className="highlight">FakeOff</span>?
                </motion.h2>
                <motion.div 
                    className="offer-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {offers.map((offer, index) => (
                        <motion.div
                            key={index}
                            className="offer"
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 8px 16px rgba(106, 17, 203, 0.2)" 
                            }}
                        >
                            <h3>{offer.title}</h3>
                            <p>{offer.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhatWeOffer;