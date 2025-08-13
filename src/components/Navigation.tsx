import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/KiranRakh', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kiran-rakh-b644b6248/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:kiranrakh155@gmail.com', label: 'Email' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? isDarkMode 
          ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-800' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Kiran Rakh
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${isDarkMode ? 'text-slate-300 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'} transition-colors duration-300 font-medium`}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-400 hover:text-violet-400 hover:bg-slate-700' 
                  : 'bg-gray-200 text-gray-600 hover:text-violet-600 hover:bg-gray-300'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-4 ml-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDarkMode ? 'text-slate-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'} transition-colors duration-300`}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-sm border-t transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-900/95 border-slate-800' 
                : 'bg-white/95 border-gray-200'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center space-x-2 px-3 py-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              
              <div className="flex items-center space-x-4 px-3 py-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};