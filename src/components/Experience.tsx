import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = [
    {
      company: 'FusionPact Technologies',
      role: 'DevOps Intern',
      period: 'May 2025 – Present',
      location: 'Remote',
      color: 'from-cyan-400 to-blue-500',
      description: 'Working on cloud infrastructure automation and CI/CD pipeline development.',
      achievements: [
        'Implementing infrastructure as code using Terraform',
        'Building automated deployment pipelines',
        'Monitoring and optimizing cloud resources',
        'Collaborating with development teams on DevOps best practices'
      ]
    },
    {
      company: 'LinuxWorld Informatics',
      role: 'DevOps Intern As Learner',
      period: 'Jan 2025 – Present',
      location: 'Jaipur, Remote',
      color: 'from-purple-400 to-pink-500',
      description: 'Learning and implementing advanced DevOps technologies and practices.',
      achievements: [
        'Hands-on experience with Kubernetes orchestration',
        'Docker containerization and optimization',
        'CI/CD pipeline automation with Jenkins',
        'Monitoring solutions with Prometheus and Grafana'
      ]
    },
    {
      company: 'Greateway Software',
      role: 'AWS DevOps Intern',
      period: 'Jul 2024 – Jan 2025',
      location: 'Pune',
      color: 'from-orange-400 to-red-500',
      description: 'Focused on AWS cloud services and DevOps automation.',
      achievements: [
        'Deployed scalable applications on AWS EC2',
        'Implemented auto-scaling and load balancing',
        'Configured VPC and security groups',
        'Automated backup and disaster recovery processes'
      ]
    },
    {
      company: 'Oasis Infobyte',
      role: 'Web Developer Intern',
      period: 'Jan 2023 – Feb 2023',
      location: 'Remote',
      color: 'from-green-400 to-cyan-500',
      description: 'Developed responsive web applications and learned modern web technologies.',
      achievements: [
        'Built responsive web applications using React',
        'Implemented RESTful APIs and database integration',
        'Collaborated with design teams on UI/UX improvements',
        'Gained foundational knowledge in web development'
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
      },
    },
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            My professional journey in DevOps and software development
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-500 hidden md:block"></div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full hidden md:block"></div>
                
                <div className="md:ml-16 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10 overflow-hidden">
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${exp.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {exp.role}
                          </h3>
                          <p className="text-cyan-400 text-lg font-medium mb-2">
                            {exp.company}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-slate-400 text-sm">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Key Achievements:</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-start space-x-2">
                            <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-slate-300 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://drive.google.com/file/d/1PCrE7L3v9qBdMoFAlB-3GWSbU6fq2TDa/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
          >
            <ExternalLink className="w-5 h-5" />
            <span>View Full Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};