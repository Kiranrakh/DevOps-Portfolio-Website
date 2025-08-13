import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import AboutSkills from './components/AboutSkills';
import { Projects } from './components/Projects';
import { Challenges } from './components/Challenges';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Mentors } from './components/Mentors';
import { VideoIntro } from './components/VideoIntro';
import { LinkedInPosts } from './components/LinkedInPosts';
import { GitHubRepos } from './components/GitHubRepos';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { AdminPanel } from './components/AdminPanel';
import { ParticleBackground } from './components/ParticleBackground';
import { Footer } from './components/Footer';
import { profile } from '../assets/profile.jpg'; // kiran did this change





function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorTrails, setCursorTrails] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Add ultra-smooth cursor trail
      const trailId = Date.now();
      setCursorTrails(prev => [...prev.slice(-12), { id: trailId, x: e.clientX, y: e.clientY }]);
      
      // Remove trail after animation
      setTimeout(() => {
        setCursorTrails(prev => prev.filter(trail => trail.id !== trailId));
      }, 600);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList?.contains('cursor-pointer'))) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList?.contains('cursor-pointer'))) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-x-hidden transition-all duration-500`}>
        {/* Custom Cursor */}
        <div
          className={`cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        />
        
        <ParticleBackground isDarkMode={isDarkMode} />
        
        {/* Cursor Trails */}
        {cursorTrails.map((trail, index) => (
          <div
            key={trail.id}
            className="cursor-trail"
            style={{
              left: `${trail.x - 3}px`,
              top: `${trail.y - 3}px`,
              animationDelay: `${index * 0.05}s`,
            }}
          />
        ))}
        
        <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Routes>
          <Route path="/" element={
            <main className="relative z-10">
              <Hero isDarkMode={isDarkMode} />
              <AboutSkills isDarkMode={isDarkMode} />
              <Projects />
              <Challenges />
              <Education />
              <Experience />
              <Mentors />
              <VideoIntro />
              <LinkedInPosts />
              <GitHubRepos />
              <Services />
              <Contact />
            </main>
          } />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
