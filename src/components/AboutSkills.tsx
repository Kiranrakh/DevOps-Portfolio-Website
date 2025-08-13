import React from 'react';
import { About } from './About';
import { Skills } from './Skills';

interface AboutSkillsProps {
  isDarkMode: boolean;
}

const AboutSkills: React.FC<AboutSkillsProps> = ({ isDarkMode }) => {
  return (
    <>
      <About isDarkMode={isDarkMode} />
      <Skills isDarkMode={isDarkMode} />
    </>
  );
};

export default AboutSkills;