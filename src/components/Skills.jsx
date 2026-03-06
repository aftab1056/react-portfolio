import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CodeBracketIcon, CpuChipIcon, ServerIcon, CodeBracketSquareIcon, DevicePhoneMobileIcon, PaintBrushIcon, ChartBarIcon, CloudIcon } from '@heroicons/react/24/outline';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  languages: [
    { name: 'C++', level: 85, icon: '💻', type: 'code' },
    { name: 'Python', level: 90, icon: '🐍', type: 'snake' },
    { name: 'JavaScript', level: 88, icon: '📜', type: 'bounce' },
    { name: 'TypeScript', level: 82, icon: '🔷', type: 'float' },
  ],
  frontend: [
    { name: 'React', level: 90, icon: '⚛️', type: 'atom' },
    { name: 'Next.js', level: 85, icon: '⏭️', type: 'float' },
    { name: 'Redux', level: 83, icon: '🔄', type: 'spin' },
    { name: 'Tailwind CSS', level: 88, icon: '🎨', type: 'pulse' },
  ],
  backend: [
    { name: 'Node.js', level: 85, icon: '🟢', type: 'bounce' },
    { name: 'Express', level: 82, icon: '🚀', type: 'float' },
    { name: 'MongoDB', level: 80, icon: '🍃', type: 'spin' },
    { name: 'PostgreSQL', level: 78, icon: '🐘', type: 'pulse' },
  ],
  tools: [
    { name: 'Git', level: 88, icon: '🔀', type: 'bounce' },
    { name: 'Docker', level: 80, icon: '🐳', type: 'float' },
    { name: 'AWS', level: 75, icon: '☁️', type: 'pulse' },
    { name: 'Figma', level: 85, icon: '✏️', type: 'float' },
  ]
};

const SkillCard = ({ skill, index, category }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const iconRef = useRef(null);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    }),
    hover: {
      y: -12,
      boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.2)',
      transition: { duration: 0.3 }
    }
  };

  // Icon animations based on type
  useEffect(() => {
    if (!iconRef.current) return;

    const icon = iconRef.current;
    let animation;

    switch(skill.type) {
      case 'bounce':
        animation = gsap.to(icon, {
          y: -5,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut'
        });
        break;
      case 'spin':
        animation = gsap.to(icon, {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: 'none'
        });
        break;
      case 'float':
        animation = gsap.to(icon, {
          y: -10,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
        break;
      case 'pulse':
        animation = gsap.to(icon, {
          scale: 1.1,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
        break;
      case 'atom':
        // React atom animation
        gsap.set(icon, { transformOrigin: 'center' });
        animation = gsap.to(icon, {
          rotation: 360,
          duration: 12,
          repeat: -1,
          ease: 'none'
        });
        
        // Add electron dots
        const dots = [];
        for (let i = 0; i < 3; i++) {
          const dot = document.createElement('div');
          dot.className = 'absolute w-1 h-1 bg-cyan-400 rounded-full';
          icon.appendChild(dot);
          dots.push(dot);
          
          const angle = (i * 120) * (Math.PI / 180);
          const radius = 12;
          
          gsap.to(dot, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
        
        return () => {
          dots.forEach(dot => dot.remove());
          animation.kill();
        };
      case 'code':
        // Typing effect for C++
        const code = 'cout << "Hello, World!" << endl;';
        let charIndex = 0;
        const type = () => {
          if (charIndex < code.length) {
            icon.textContent = code.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 100);
          } else {
            setTimeout(() => {
              charIndex = 0;
              type();
            }, 2000);
          }
        };
        type();
        return;
      case 'snake':
        // Snake animation for Python
        const snakeFrames = ['🐍', '🐍', '🐍', '🐍', '🐍', '🐍', '🐍', '🐍'];
        let frame = 0;
        const animateSnake = () => {
          icon.textContent = snakeFrames[frame % snakeFrames.length];
          frame++;
          setTimeout(animateSnake, 300);
        };
        animateSnake();
        return;
    }

    return () => {
      if (animation) animation.kill();
    };
  }, [skill.type]);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-50px' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group"
    >
      <div className="flex items-center space-x-4">
        <div 
          ref={iconRef}
          className="text-3xl w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
        >
          {skill.type !== 'code' && skill.type !== 'snake' && (
            <span>{skill.icon}</span>
          )}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
          <div className="mt-2 bg-gray-700/50 rounded-full h-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 + (index * 0.1) }}
            />
          </div>
          <motion.span 
            className="absolute top-4 right-4 text-sm font-mono text-cyan-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + (index * 0.1) }}
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-sm px-3 py-1.5 rounded whitespace-nowrap z-10 shadow-lg"
          >
            {skill.name} - {skill.level}% proficiency
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillCategory = ({ title, icon: Icon, skills, category }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <SkillCard 
            key={`${category}-${index}`} 
            skill={skill} 
            index={index}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Animate progress bars with GSAP
  useEffect(() => {
    if (!inView) return;

    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const value = bar.getAttribute('data-value');
      gsap.to(bar, {
        width: `${value}%`,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function() {
          const progress = Math.round(this.progress() * parseInt(value));
          const counter = bar.previousElementSibling;
          if (counter) {
            counter.textContent = `${progress}%`;
          }
        },
        scrollTrigger: {
          trigger: bar.parentElement,
          start: 'top 80%',
        }
      });
    });

    // Add pulse animation when progress completes
    gsap.to('.progress-bar', {
      boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)',
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      scrollTrigger: {
        trigger: '.skills-container',
        start: 'top center',
        onEnter: () => {
          gsap.to('.progress-bar', {
            scale: 1.02,
            duration: 0.3,
            yoyo: true,
            repeat: 1
          });
        }
      }
    });
  }, [inView]);

  return (
    <section 
      id="skills" 
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto my-4 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 skills-container">
          {/* Left Column - Progress Bars */}
          <div className="space-y-10">
            <SkillCategory
              title="Programming Languages"
              icon={CodeBracketIcon}
              skills={skillsData.languages}
              category="languages"
            />
            <SkillCategory
              title="Frontend Development"
              icon={DevicePhoneMobileIcon}
              skills={skillsData.frontend}
              category="frontend"
            />
            <SkillCategory
              title="Backend Development"
              icon={ServerIcon}
              skills={skillsData.backend}
              category="backend"
            />
            <SkillCategory
              title="Tools & Technologies"
              icon={CpuChipIcon}
              skills={skillsData.tools}
              category="tools"
            />
          </div>

          {/* Right Column - Skill Cards */}
          <div className="space-y-10">
            <SkillCategory
              title="Frameworks"
              icon={CodeBracketSquareIcon}
              skills={skillsData.frontend.concat(skillsData.backend).slice(0, 4)}
              category="frameworks"
            />
            <SkillCategory
              title="UI/UX Design"
              icon={PaintBrushIcon}
              skills={[
                { name: 'Figma', level: 85, icon: '🎨', type: 'float' },
                { name: 'Adobe XD', level: 80, icon: '✏️', type: 'pulse' },
                { name: 'Sketch', level: 75, icon: '✏️', type: 'bounce' },
                { name: 'Framer', level: 78, icon: '🖌️', type: 'spin' },
              ]}
              category="design"
            />
            <SkillCategory
              title="Data & Cloud"
              icon={CloudIcon}
              skills={[
                { name: 'AWS', level: 80, icon: '☁️', type: 'float' },
                { name: 'Firebase', level: 85, icon: '🔥', type: 'pulse' },
                { name: 'MongoDB', level: 82, icon: '🍃', type: 'spin' },
                { name: 'PostgreSQL', level: 78, icon: '🐘', type: 'bounce' },
              ]}
              category="data"
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Skills;