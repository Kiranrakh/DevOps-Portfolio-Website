import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileImg from '../assets/profile.jpg';
import profile from '../assets/profile.jpg';


import { Download, Github, Linkedin, Mail, ChevronDown, Zap, Shield, Code2 } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'DevOps Enthusiast',
    'CI/CD Pipeline Builder',
    'Cloud Native Learner',
    'Kubernetes Specialist',
    'Automation Lover',
  ];

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < phrase.length) {
          setCurrentText(phrase.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhrase, phrases]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/KiranRakh', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kiran-rakh-b644b6248/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:kiranrakh155@gmail.com', label: 'Email' },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-violet-900/20 to-purple-900/20' 
          : 'bg-gradient-to-br from-gray-50 via-violet-50/30 to-purple-50/30'
      }`} />
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left mt-16 lg:mt-24"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className={isDarkMode ? "text-white" : "text-gray-900"}>Hi, I'm </span>
              <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                Kiran Rakh
              </span>
            </h1>
            
            <div className="text-xl md:text-2xl lg:text-3xl mb-8 h-16 flex items-center">
              <span className={isDarkMode ? "text-slate-300" : "text-gray-600"}>I'm a </span>
              <span className="ml-2 text-violet-500 font-semibold">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            <p className={`text-lg md:text-xl mb-8 max-w-2xl leading-relaxed ${
              isDarkMode ? "text-slate-300" : "text-gray-700"
            }`}>
              Passionate DevOps Engineer with expertise in cloud-native infrastructure, automation pipelines, and container orchestration. Experienced in building scalable solutions using modern DevOps practices, CI/CD automation, and cloud technologies. Committed to continuous learning and delivering reliable, efficient systems.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <a
                href="https://drive.google.com/file/d/1PCrE7L3v9qBdMoFAlB-3GWSbU6fq2TDa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Resume</span>
              </a>
              
              <div className="flex items-center space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-110 ${
                      isDarkMode 
                        ? 'bg-slate-800/50 text-slate-400 hover:text-violet-400 hover:bg-slate-700/50' 
                        : 'bg-white/50 text-gray-600 hover:text-violet-600 hover:bg-white/70'
                    }`}
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Modern Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end mt-20 lg:mt-24"
          >
            <div className="relative">
              {/* Main Profile Container */}
              <motion.div 
                className="relative w-[360px] h-[440px] mx-auto"
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                {/* Animated Background Card */}
                <div className={`absolute inset-0 rounded-3xl backdrop-blur-xl border-2 overflow-hidden shadow-2xl transition-all duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-slate-900/95 via-violet-900/90 to-purple-900/95 border-violet-400/50 shadow-violet-500/30' 
                    : 'bg-gradient-to-br from-white/95 via-violet-50/90 to-purple-50/95 border-violet-400/60 shadow-violet-400/40'
                }`}>
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl">
                    <div className={`absolute inset-0 rounded-3xl animate-pulse ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-violet-500/40 via-purple-500/40 to-pink-500/40' 
                        : 'bg-gradient-to-r from-violet-400/50 via-purple-400/50 to-pink-400/50'
                    }`}></div>
                    <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-violet-400/20 to-transparent animate-ping"></div>
                  </div>
                  
                  {/* Enhanced Tech Pattern Background */}
                  <div className={`absolute inset-0 ${isDarkMode ? 'opacity-10' : 'opacity-5'}`}>
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.6) 3px, transparent 3px),
                        radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.6) 3px, transparent 3px),
                        linear-gradient(45deg, transparent 40%, rgba(139, 92, 246, 0.25) 50%, transparent 60%),
                        linear-gradient(-45deg, transparent 40%, rgba(236, 72, 153, 0.25) 50%, transparent 60%)
                      `,
                      backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px'
                    }}></div>
                  </div>
                  
                  {/* Animated Scanning Lines */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className={`absolute w-full h-1 bg-gradient-to-r from-transparent to-transparent animate-pulse ${
                      isDarkMode ? 'via-violet-400/60' : 'via-violet-500/40'
                    }`}
                         style={{ top: '20%', animationDelay: '0s', animationDuration: '3s' }}></div>
                    <div className={`absolute w-full h-1 bg-gradient-to-r from-transparent to-transparent animate-pulse ${
                      isDarkMode ? 'via-purple-400/60' : 'via-purple-500/40'
                    }`}
                         style={{ top: '60%', animationDelay: '1s', animationDuration: '3s' }}></div>
                    <div className={`absolute w-full h-1 bg-gradient-to-r from-transparent to-transparent animate-pulse ${
                      isDarkMode ? 'via-pink-400/60' : 'via-pink-500/40'
                    }`}
                         style={{ top: '80%', animationDelay: '2s', animationDuration: '3s' }}></div>
                  </div>
                </div>
                
                {/* Profile Image Container */}
                <div className="absolute inset-4 top-6 bottom-20 rounded-2xl overflow-hidden">
                  <motion.div 
                    className={`relative w-full h-full rounded-2xl overflow-hidden border-2 shadow-lg transition-all duration-500 ${
                      isDarkMode 
                        ? 'border-violet-500/70 shadow-violet-500/40' 
                        : 'border-violet-400/80 shadow-violet-400/50'
                    }`}
                    whileHover={{ 
                      borderColor: 'rgba(139, 92, 246, 0.9)',
                      boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)'
                    }}
                  >
                    <img
                      src={profile}
                      alt="Kiran Rakh - DevOps Engineer"
                      className="w-full h-full object-cover object-center transition-all duration-700 hover:brightness-110 hover:contrast-110 hover:saturate-105"
                      style={{ 
                        filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.5)) saturate(1.1) brightness(1.05) contrast(1.03)',
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-t via-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 ${
                        isDarkMode 
                          ? 'from-violet-600/30 to-purple-600/30' 
                          : 'from-violet-500/25 to-purple-500/25'
                      }`}
                    />
                    
                    {/* Professional Badge */}
                    <div className={`absolute top-2 right-2 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold shadow-lg ${
                      isDarkMode 
                        ? 'bg-violet-600/90 text-white' 
                        : 'bg-violet-600/85 text-white'
                    }`}>
                      DevOps Pro
                    </div>
                  </motion.div>
                </div>
                
                {/* Info Panel */}
                <div className="absolute bottom-3 left-4 right-4">
                  <motion.div
                    className={`backdrop-blur-md rounded-2xl p-3 border-2 shadow-xl transition-all duration-500 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-slate-900/95 via-violet-900/90 to-purple-900/95 border-violet-500/50 shadow-violet-500/30' 
                        : 'bg-gradient-to-r from-white/95 via-violet-50/90 to-purple-50/95 border-violet-400/70 shadow-violet-400/40'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <div className="text-center">
                      <h3 className={`text-base font-bold mb-1 ${
                        isDarkMode 
                          ? 'text-white' 
                          : 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'
                      }`}>
                        DevOps Engineer
                      </h3>
                      <p className={`text-sm mb-1 font-bold ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent' 
                          : 'text-violet-600'
                      }`}>
                        🎓 B.E Graduate 2024
                      </p>
                      <p className={`text-xs mb-1 font-medium ${
                        isDarkMode ? 'text-purple-300' : 'text-purple-600'
                      }`}>📍 Pune, India</p>
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className={`text-xs font-medium ${
                            isDarkMode ? 'text-green-300' : 'text-green-600'
                          }`}>Online</span>
                        </div>
                        <div className="w-1 h-1 bg-violet-400 rounded-full"></div>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-violet-300' : 'text-violet-600'
                        }`}>CGPA: 7.33</span>
                      </div>
                      <div className={`text-xs font-medium ${
                        isDarkMode ? 'text-purple-300' : 'text-purple-600'
                      }`}>
                        ⚡ Available for DevOps Opportunities
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Enhanced Floating Tech Icons */}
                <div className="absolute inset-0 pointer-events-none">                  
                  {[
                    { icon: "🐳", delay: 0, x: -45, y: -30, color: "text-blue-400" },
                    { icon: "☸️", delay: 0.5, x: 45, y: -25, color: "text-purple-400" },
                    { icon: "⚡", delay: 1, x: -40, y: 30, color: "text-pink-400" },
                    { icon: "🔧", delay: 1.5, x: 50, y: 35, color: "text-violet-400" },
                    { icon: "☁️", delay: 2, x: -50, y: 0, color: "text-indigo-400" },
                    { icon: "🚀", delay: 2.5, x: 55, y: 10, color: "text-rose-400" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className={`absolute text-3xl opacity-90 ${item.color} drop-shadow-xl`}
                      style={{
                        left: `${50 + item.x}%`,
                        top: `${40 + item.y}%`,
                      }}
                      animate={{
                        y: [0, -25, 0],
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.3, 1],
                        opacity: [0.9, 1, 0.9],
                      }}
                      transition={{
                        duration: 6,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center mt-24"
        >
          <a
            href="#about-skills"
            className={`transition-colors duration-300 animate-bounce ${
              isDarkMode ? 'text-slate-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
            }`}
          >
            <ChevronDown className="w-8 h-8" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
