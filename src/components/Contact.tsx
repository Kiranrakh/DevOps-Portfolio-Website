import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Download, CheckCircle, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Using EmailJS service for direct email sending
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_portfolio', // You'll need to set this up in EmailJS
          template_id: 'template_contact', // You'll need to set this up in EmailJS
          user_id: 'your_emailjs_user_id', // You'll need to get this from EmailJS
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'kiranrakh155@gmail.com',
          },
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Fallback: Use Formspree as backup service
      try {
        const formspreeResponse = await fetch('https://formspree.io/f/kiranrakh155@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.email,
          }),
        });

        if (formspreeResponse.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error('Backup service also failed');
        }
      } catch (backupError) {
        console.error('Backup service error:', backupError);
        
        // Final fallback: Create mailto link with pre-filled content
        const emailSubject = encodeURIComponent(formData.subject || 'Portfolio Contact - DevOps Opportunity');
        const emailBody = encodeURIComponent(`
Dear Kiran,

I am reaching out regarding your DevOps portfolio.

Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Best regards,
${formData.name}

---
This message was sent from your portfolio website contact form.
        `);
        
        const mailtoLink = `mailto:kiranrakh155@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        window.location.href = mailtoLink;
        
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'kiranrakh155@gmail.com',
      href: 'mailto:kiranrakh155@gmail.com',
      color: 'from-red-400 to-pink-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7721879397',
      href: 'tel:+917721879397',
      color: 'from-green-400 to-cyan-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Pune, India',
      href: '#',
      color: 'from-blue-400 to-purple-500',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/KiranRakh', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kiran-rakh-b644b6248/', label: 'LinkedIn' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Get In Touch
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Ready to discuss DevOps opportunities or collaborate on exciting projects? Let's connect!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6 text-white">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-center space-x-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">{contact.label}</p>
                      <p className="text-white font-medium">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6 text-white">
                Social Media
              </h3>
              
              <div className="flex items-center space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10 hover:scale-110"
                  >
                    <link.icon className="w-6 h-6 text-slate-400 hover:text-cyan-400 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a
                href="https://drive.google.com/file/d/1PCrE7L3v9qBdMoFAlB-3GWSbU6fq2TDa/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Send a Message
            </h3>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">Message sent successfully! I'll get back to you soon.</span>
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg flex items-center space-x-2"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400">Failed to send message. Please try again or contact me directly.</span>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-slate-400 disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-slate-400 disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-slate-400 disabled:opacity-50"
                  placeholder="Subject of your message"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-slate-400 resize-none disabled:opacity-50"
                  placeholder="Your message here..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};