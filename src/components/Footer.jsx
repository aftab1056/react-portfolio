import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiMail, FiCode } from 'react-icons/fi';
import { FaReact } from 'react-icons/fa';

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [currentYear, setCurrentYear] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);
  const tooltipTimeout = useRef(null);

  // Check scroll position for back-to-top button
  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  // Animate year counter
  useEffect(() => {
    const targetYear = new Date().getFullYear();
    const duration = 2000; // 2 seconds
    const increment = targetYear / (duration / 16); // 60fps

    const animateYear = () => {
      setCurrentYear(prev => {
        const newYear = Math.ceil(prev + increment);
        return newYear >= targetYear ? targetYear : newYear;
      });
    };

    const timer = setInterval(() => {
      if (currentYear < targetYear) {
        animateYear();
      } else {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: <FiGithub className="w-5 h-5" />, 
      url: 'https://github.com/aftab1056/react-portfolio',
      color: 'hover:text-gray-800 dark:hover:text-white'
    },
    { 
      name: 'LinkedIn', 
      icon: <FiLinkedin className="w-5 h-5" />, 
      url: 'https://www.linkedin.com/in/aftab-jamil-03a95a2b7/',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Twitter', 
      icon: <FiTwitter className="w-5 h-5" />, 
      url: 'https://x.com/Aftabjamil726',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Email', 
      icon: <FiMail className="w-5 h-5" />, 
      url: 'mailto:aftabjamil760@gmail.com',
      color: 'hover:text-red-500'
    },
  ];

  const handleHover = (index) => {
    setIsHovered(index);
    setShowTooltip(index);
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
  };

  const handleHoverEnd = (index) => {
    tooltipTimeout.current = setTimeout(() => {
      setShowTooltip(null);
    }, 300);
  };

  const copyrightText = "© 2023 - " + currentYear + " Your Name. All rights reserved.";

  return (
    <motion.footer 
      className="relative bg-gray-900 text-gray-300 pt-12 pb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      viewport={{ once: true }}
    >
      {/* Animated gradient border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center">
          {/* Social Icons */}
          <div className="flex space-x-6 mb-8 relative">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 ${social.color}`}
                whileHover={{ 
                  scale: 1.25,
                  rotate: 10,
                  transition: { 
                    type: 'spring',
                    stiffness: 300,
                    damping: 10
                  }
                }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHoverEnd(index)}
              >
                <motion.div
                  animate={isHovered === index ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: isHovered === index ? Infinity : 0, duration: 1.5 }}
                >
                  {social.icon}
                </motion.div>
                
                <AnimatePresence>
                  {showTooltip === index && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-3 rounded whitespace-nowrap"
                    >
                      {social.name}
                      <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>

          {/* Copyright with typewriter effect */}
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.5 }
            }}
          >
            <div className="font-mono text-sm md:text-base">
              {copyrightText.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { 
                      delay: 0.5 + (i * 0.02),
                      duration: 0.3
                    }
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Made with love */}
          <motion.div 
            className="flex items-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 1 }
            }}
          >
            <span>Made with</span>
            <motion.span 
              className="mx-1 text-red-500"
              animate={{ 
                scale: [1, 1.2, 1],
                transition: { 
                  repeat: Infinity, 
                  duration: 1.5 
                }
              }}
            >
              ❤️
            </motion.span>
            <span>and</span>
            <motion.span 
              className="ml-1 text-blue-400 flex items-center"
              whileHover={{ 
                scale: 1.1,
                transition: { type: 'spring', stiffness: 500 }
              }}
            >
              <FaReact className="mx-1" />
              React
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0],
              transition: { 
                y: { 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
            whileHover={{ 
              y: -5,
              scale: 1.1,
              transition: { 
                y: { 
                  duration: 0.3,
                  repeat: 0
                }
              }
            }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 z-50"
            aria-label="Back to top"
          >
            <FiArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;