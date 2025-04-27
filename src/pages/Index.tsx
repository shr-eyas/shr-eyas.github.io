
import React from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { Mail, Github, Linkedin } from 'lucide-react';

const Index = () => {
  const projects = [
    {
      title: "Project One",
      description: "A brief description of the first project and its key features.",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      link: "#"
    },
    {
      title: "Project Two",
      description: "Description of the second project highlighting main achievements.",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      link: "#"
    },
    {
      title: "Project Three",
      description: "Overview of the third project showcasing technical expertise.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="text-5xl font-bold mb-6">Hello, I'm [Your Name]</h1>
          <p className="text-xl text-muted-foreground">
            A passionate developer crafting beautiful digital experiences. I specialize in building modern web applications with a focus on clean design and user experience.
          </p>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12">Selected Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8">
            I'm always open to new opportunities and interesting projects.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:your.email@example.com" className="p-2 hover:text-primary transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
