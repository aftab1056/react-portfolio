import React from 'react';
import { motion } from 'framer-motion';

const mernVideos = [
  {
    src: '/vedios/Untitled design.mp4',
    title: 'Project Demo 1',
  },
  {
    src: '/vedios/Screencast 2026-01-24 15_03_26.mp4',
    title: 'Project Demo 2',
  },
  {
    src: '/vedios/Screencast 2026-01-26 12_52_12.mp4',
    title: 'Project Demo 3',
  },
  {
    src: '/vedios/Screencast 2026-01-28 12_01_18.mp4',
    title: 'Project Demo 4',
  },
  {
    src: '/vedios/Screencast 2026-01-28 15_00_27.mp4',
    title: 'Project Demo 5',
  },
  {
    src: '/vedios/Screencast 2026-01-29 13_52_43.mp4',
    title: 'Project Demo 6',
  },
  {
    src: '/vedios/Screencast 2026-01-31 19_35_59.mp4',
    title: 'Project Demo 7',
  },
  {
    src: '/vedios/Screencast 2026-02-01 15_31_18.mp4',
    title: 'Project Demo 8',
  },
  {
    src: '/vedios/nodemailer.mp4',
    title: 'Project Demo 9',
  },
  {
    src: '/vedios/Screencast 2026-03-10 07:57:56.mp4',
    title: 'Project Demo 10',
  },
  {
    src: '/vedios/Screencast 2026-03-10 08:02:39.mp4',
    title: 'Project Demo 11',
  },
  {
    src: '/vedios/Screencast 2026-03-10 08:00:29.mp4',
    title: 'Project Demo 12',
  },
  // If you add more files into public/vedios, add them here as:
  // { src: '/vedios/your-file-name.mp4', title: 'New Project Demo' },
];

const MernProjects = () => {
  return (
    <section className="relative py-20 min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl" />
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            MERN Stack Project Videos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my MERN projects in action. Each video below shows a different project
            running, in sequence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mernVideos.map((video, index) => (
            <motion.div
              key={video.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 backdrop-blur-sm cursor-pointer"
              onClick={(e) => {
                const videoElement = e.currentTarget.querySelector('video');
                if (videoElement && videoElement.requestFullscreen) {
                  videoElement.requestFullscreen();
                }
              }}
            >
              <p className="text-cyan-400 text-sm font-medium">
                {index + 1}. {video.title}
              </p>
              <video
                className="w-full rounded-lg border border-white/10"
                controls
                src={video.src}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MernProjects;

