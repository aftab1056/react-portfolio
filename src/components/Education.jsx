import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    id: 1,
    degree: 'Master of Computer Science',
    institution: 'Tech University',
    year: '2022 - 2024',
    description: 'Specialized in Artificial Intelligence and Machine Learning',
    progress: 90,
    icon: '🎓',
    isCurrent: true,
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'State University',
    year: '2018 - 2022',
    description: 'Focus on Full Stack Development and System Design',
    progress: 100,
    icon: '💻',
  },
  {
    id: 3,
    degree: 'High School Diploma',
    institution: 'Elite Science College',
    year: '2016 - 2018',
    description: 'Major in Computer Science and Mathematics',
    progress: 100,
    icon: '📚',
  },
];

const ProgressBar = ({ percentage, color = 'bg-cyan-500' }) => (
  <div className="w-full bg-gray-700/50 rounded-full h-2.5 mt-2">
    <motion.div
      className={`h-full rounded-full ${color}`}
      initial={{ width: 0 }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    />
  </div>
);

const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const timelineRef = useRef(null);
  const educationRefs = useRef([]);

  // GSAP Timeline Animation
  useEffect(() => {
    if (!timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      });

      // Staggered animation for each education item
      educationRefs.current.forEach((el, i) => {
        tl.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.2,
          },
          i * 0.15
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
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
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      id="education"
      className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Education & Background
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto my-4 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic journey and professional development
          </p>
        </motion.div>

      <div className="relative" ref={timelineRef}>
        {/* Timeline line */}
        <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500/30 to-blue-500/30"></div>
        
        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              ref={el => educationRefs.current[index] = el}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              whileHover="hover"
              className={`relative group ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}
              style={{
                marginLeft: index % 2 === 0 ? '50%' : '0',
                paddingLeft: index % 2 === 0 ? '2rem' : '0',
                paddingRight: index % 2 === 0 ? '0' : '2rem',
              }}
            >
              <motion.div
                className={`p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 
                  transition-all duration-300 group-hover:shadow-xl group-hover:shadow-cyan-500/20
                  ${edu.isCurrent ? 'border-cyan-500/30' : 'border-white/10'}
                  ${edu.isCurrent ? 'animate-float' : ''}`}
                animate={edu.isCurrent ? {
                  y: [0, -10, 0],
                  boxShadow: ['0 4px 20px rgba(6, 182, 212, 0.1)', '0 10px 30px rgba(6, 182, 212, 0.2)', '0 4px 20px rgba(6, 182, 212, 0.1)'],
                } : {}}
                transition={edu.isCurrent ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                } : {}}
              >
                <div className="flex items-start">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-2xl mr-4
                      group-hover:rotate-12 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {edu.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                        <p className="text-cyan-400">{edu.institution}</p>
                      </div>
                      <span className="px-3 py-1 text-sm rounded-full bg-cyan-900/30 text-cyan-400">
                        {edu.year}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-400">{edu.description}</p>
                    {!edu.isCurrent && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{edu.progress}%</span>
                        </div>
                        <ProgressBar percentage={edu.progress} />
                      </div>
                    )}
                    {edu.isCurrent && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-cyan-400 mb-1">
                          <span>In Progress</span>
                          <span>{edu.progress}%</span>
                        </div>
                        <ProgressBar 
                          percentage={edu.progress} 
                          color="bg-gradient-to-r from-cyan-500 to-blue-500" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Timeline dot */}
              <div 
                className={`absolute top-8 w-5 h-5 rounded-full border-4 
                  ${edu.isCurrent 
                    ? 'bg-cyan-500 border-cyan-500/30 animate-ping-slow' 
                    : 'bg-gray-800 border-cyan-500'}
                  ${index % 2 === 0 ? '-left-2.5' : '-right-2.5'}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Education;
