import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Typewriter effect component
const Typewriter = ({ text, speed = 100, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span className={className}>{displayText}</span>;
};

// Floating element component
const FloatingElement = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{
      y: [0, -15, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Particle component for background
const Particle = ({ size, x, y, delay }) => (
  <motion.div
    className="absolute rounded-full bg-white/5"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.3, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
    }}
    transition={{
      duration: 3 + Math.random() * 5,
      delay,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    }}
  />
);

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Generate random particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  // Play sound on hover
  const playHoverSound = () => {
    // Uncomment to enable sound effects (requires audio file)
    // const audio = new Audio('/sounds/hover.mp3');
    // audio.volume = 0.3;
    // audio.play().catch(e => console.log('Audio play failed:', e));
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      ref={ref}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            size={particle.size}
            x={particle.x}
            y={particle.y}
            delay={particle.delay}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Floating elements */}
        <FloatingElement
          className="absolute -top-10 left-1/4 w-8 h-8 bg-blue-500/20 rounded-full blur-xl"
          delay={0.5}
        />
        <FloatingElement
          className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-500/20 rounded-full blur-xl"
          delay={1}
        />
        <FloatingElement
          className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-cyan-500/20 rounded-full blur-xl"
          delay={1.5}
        />

        {/* Main content */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="text-sm md:text-base font-medium text-cyan-400 bg-cyan-900/30 px-4 py-1.5 rounded-full inline-flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-gray-300">Hi, I'm </span>
          <Typewriter
            text="Aftab Jamil"
            speed={100}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          />
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto"
        >
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            <Typewriter
              text="Clean code. Great UX."
              speed={50}
              className="font-medium"
            />
          </span>
          <span className="inline-block animate-pulse">✨</span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={playHoverSound}
          >
            Contact Me
          </motion.a>
          <motion.a
            href="#skills"
            className="px-8 py-4 bg-transparent border-2 border-gray-700 text-gray-300 font-medium rounded-full hover:bg-white/5 hover:border-cyan-500/50 hover:text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            whileHover={{ 
              y: -5,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={playHoverSound}
          >
            View Skills
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1.5 h-2 bg-cyan-400 rounded-full"
              animate={{
                y: [0, 8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
