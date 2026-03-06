import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
// import Lottie from 'lottie-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { FiSend, FiCheck, FiX, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

// Animation variants
const container = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const socialLinks = [
  { 
    name: 'GitHub', 
    icon: <FiGithub className="w-6 h-6" />, 
    url: 'https://github.com/yourusername' 
  },
  { 
    name: 'LinkedIn', 
    icon: <FiLinkedin className="w-6 h-6" />, 
    url: 'https://linkedin.com/in/yourusername' 
  },
  { 
    name: 'Twitter', 
    icon: <FiTwitter className="w-6 h-6" />, 
    url: 'https://twitter.com/yourusername' 
  },
  { 
    name: 'Email', 
    icon: <FiMail className="w-6 h-6" />, 
    url: 'mailto:your.email@example.com' 
  }
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const formRef = useRef();
  const buttonRef = useRef(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Ripple effect
  const createRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  // Confetti effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Replace with your EmailJS service ID, template ID, and public key
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      
      setSubmitStatus('success');
      triggerConfetti();
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-hide status message after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto my-4 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="relative"
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Status Message */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`p-4 mb-6 rounded-lg ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/10 border border-green-500/30' 
                        : 'bg-red-500/10 border border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center">
                      {submitStatus === 'success' ? (
                        <>
                          <FiCheck className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-green-400">Message sent successfully!</span>
                        </>
                      ) : (
                        <>
                          <FiX className="w-5 h-5 text-red-500 mr-2" />
                          <span className="text-red-400">Failed to send message. Please try again.</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                {/* Name Input */}
                <motion.div variants={item} className="relative">
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="John Doe"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:bg-gray-900 peer-focus:text-sm peer-focus:text-cyan-400"
                  >
                    Name
                  </label>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </motion.div>

                {/* Email Input */}
                <motion.div variants={item} className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="john@example.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:bg-gray-900 peer-focus:text-sm peer-focus:text-cyan-400"
                  >
                    Email
                  </label>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </motion.div>

                {/* Message Textarea */}
                <motion.div variants={item} className="relative">
                  <textarea
                    id="message"
                    rows="4"
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.message ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                    placeholder="Your message here..."
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 -top-2.5 bg-gray-900 px-2 text-sm text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:bg-gray-900 peer-focus:text-sm peer-focus:text-cyan-400"
                  >
                    Message
                  </label>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={item} className="pt-2">
                  <motion.button
                    ref={buttonRef}
                    type="submit"
                    onClick={createRipple}
                    disabled={isSubmitting}
                    className={`relative overflow-hidden w-full py-3 px-6 rounded-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2" />
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Let's work together</h3>
              <p className="text-gray-400">
                I'm always open to discussing product design work or partnership opportunities. Feel free to reach out through the form or any of the platforms below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">Email</h4>
                <a
                  href="mailto:your.email@example.com"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  your.email@example.com
                </a>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">Connect with me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {social.icon}
                      </span>
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {social.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;