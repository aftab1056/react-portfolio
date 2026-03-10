import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    title: 'MERN Stack',
    description: 'Full-stack development with MongoDB, Express, React, and Node.js',
    icon: '🚀',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'DSA',
    description: 'Strong problem-solving skills with Data Structures & Algorithms',
    icon: '🧠',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'APIs',
    description: 'RESTful & GraphQL API design and implementation',
    icon: '🔌',
    color: 'from-green-500 to-emerald-400',
  }
];

const About = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const navigate = useNavigate();

  // Text reveal animation
  useEffect(() => {
    if (isInView) {
      gsap.utils.toArray('.reveal-text').forEach((text) => {
        gsap.to(text, {
          backgroundPositionX: '0%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
          }
        });
      });
    }
  }, [isInView]);

  // Parallax effect
  useEffect(() => {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;

      gsap.to(element, {
        y: () => -window.scrollY * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, []);

  // Staggered animation for bullet points
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Card hover effect
  const cardVariants = {
    initial: { 
      y: 0,
      rotate: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: { 
      y: -8,
      rotate: 1,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-black"
    >
      {/* Background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl parallax-layer" 
          data-speed="0.3"
        ></div>
        <div 
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl parallax-layer" 
          data-speed="0.2"
        ></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="reveal-text bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-[length:200%_100%] bg-right">
              About Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto my-4 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={container}
            className="space-y-6"
          >
            <motion.p 
              variants={item}
              className="text-lg text-gray-300 leading-relaxed reveal-text bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 bg-[length:200%_100%] bg-right"
            >
              I'm a passionate full-stack developer with expertise in building modern web applications. With a strong foundation in computer science and years of hands-on experience, I create efficient, scalable, and user-friendly solutions.
            </motion.p>
            
            <motion.div variants={item} className="space-y-4">
              <h3 className="text-xl font-semibold text-white">My Approach:</h3>
              <motion.ul 
                variants={container}
                className="space-y-3"
              >
                {[
                  'Focus on clean, maintainable code',
                  'User-centered design principles',
                  'Performance optimization',
                  'Continuous learning and improvement'
                ].map((point, index) => (
                  <motion.li 
                    key={index}
                    variants={item}
                    className="flex items-start"
                  >
                    <span className="text-cyan-400 mr-3">▹</span>
                    <span className="text-gray-300">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          {/* Right column - Tech cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.2 * index,
                    duration: 0.6 
                  }
                }}
                viewport={{ once: true, margin: '-50px' }}
                variants={cardVariants}
                onClick={() => {
                  if (tech.title === 'MERN Stack') {
                    navigate('/mern-projects');
                  }
                }}
                whileHover="hover"
                className={`p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden group ${tech.title === 'MERN Stack' ? 'cursor-pointer' : ''}`}
              >
                {/* Animated gradient border */}
                <div className={`absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center text-2xl mb-4">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{tech.title}</h3>
                  <p className="text-gray-400 text-sm">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-10 left-1/4 w-8 h-8 bg-cyan-500/20 rounded-full blur-xl"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            delay: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 right-1/4 w-10 h-10 bg-purple-500/20 rounded-full blur-xl"
        ></motion.div>
      </div>
    </section>
  );
};

export default About;