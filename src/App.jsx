import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Import all components
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';


// Component that will be used for the scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// Main App Component
const App = () => {
  // State management
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // Section refs for intersection observer
  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [educationRef, educationInView] = useInView({ threshold: 0.3 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  // Update active section based on scroll position
  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (aboutInView) setActiveSection('about');
    else if (educationInView) setActiveSection('education');
    else if (skillsInView) setActiveSection('skills');
    else if (contactInView) setActiveSection('contact');
  }, [homeInView, aboutInView, educationInView, skillsInView, contactInView]);

  // Handle scroll for progress bar and parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Parallax effect
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
        const yPos = -(window.scrollY * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: 'beforeChildren',
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="relative overflow-x-hidden">
        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Navigation */}
        <Navbar activeSection={activeSection} />

        {/* Hero Section */}
        <div ref={homeRef}>
          <Hero />
        </div>

        {/* Main Content */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              ref={containerRef}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
            >
              {/* About Section */}
              <div ref={aboutRef}>
                <About />
              </div>

              {/* Education Section */}
              <div ref={educationRef}>
                <Education />
              </div>

              {/* Skills Section */}
              <div ref={skillsRef}>
                <Skills />
              </div>

              {/* Contact Section */}
              <div ref={contactRef}>
                <Contact />

              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer />

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f6_0,transparent_70%)] opacity-20 blur-3xl"></div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;