import { Badge } from "@/components/ui/badge";
import { Github, Youtube, ExternalLink } from "lucide-react";
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface Project {
  id: number;
  title: string;
  content: React.ReactNode;
  image?: string;
  type: "Research" | "Project" | "Self Project" | "Company" | "Academic";
  association: string;
  links?: {
    github?: string;
    youtube?: string;
    projectPage?: string;
  };
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Complex Mathematics in Nature",
      content: (
        <div className="space-y-4 overflow-x-auto">
          <p>A deep dive into mathematical patterns found in nature, featuring multiple equations and visualizations.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <img 
              src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
              alt="Starry night patterns"
              className="rounded-lg max-h-48 w-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
              alt="Natural patterns"
              className="rounded-lg max-h-48 w-full object-cover"
            />
          </div>
          <div className="max-w-full overflow-x-auto py-4">
            <BlockMath math="\oint_{\partial \Omega} \omega = \int_{\Omega} d\omega \quad \text{(Stokes' Theorem)}" />
          </div>
          <div className="max-w-full overflow-x-auto py-4">
            <BlockMath math="\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u + \sum_{i=1}^n \alpha_i \frac{\partial u}{\partial x_i} + f(x,t)" />
          </div>
        </div>
      ),
      type: "Research",
      association: "Mathematics Department",
      links: {
        github: "https://github.com/example/math-nature",
        youtube: "https://youtube.com/watch?v=nature-math",
        projectPage: "https://math-nature.example.com"
      }
    },
    {
      id: 2,
      title: "Wildlife Tracking Algorithm",
      content: (
        <div className="space-y-4">
          <p>
            An open-source algorithm for tracking wildlife movement patterns using satellite data.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            alt="Wildlife tracking visualization"
            className="max-h-64 object-cover rounded-lg mx-auto"
          />
        </div>
      ),
      type: "Project",
      association: "Conservation Tech Lab",
      links: {
        github: "https://github.com/example/wildlife-tracking"
      }
    },
    {
      id: 3,
      title: "Neural Network Visualization",
      content: (
        <div className="space-y-4">
          <p>Interactive visualization of neural network architectures and their learning processes.</p>
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            alt="Neural network visualization"
            className="max-h-64 object-cover rounded-lg mx-auto"
          />
        </div>
      ),
      type: "Self Project",
      association: "Independent",
      links: {
        github: "https://github.com/example/neural-vis",
        youtube: "https://youtube.com/watch?v=neural-demo"
      }
    },
    {
      id: 4,
      title: "AI-Enhanced Visual Recognition for Wildlife Conservation",
      content: (
        <div className="space-y-4">
          <p>
            A machine learning system that automatically identifies endangered species in camera trap footage, significantly reducing manual processing time.
          </p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      type: "Company",
      association: "EcoTech Solutions"
    }
  ];

  return (
    <div className="py-16 px-6 md:px-12 lg:px-24">
      <p className="text-lg mb-12 max-w-8xl">
        My work spans across research, academic projects, and independent explorations. 
        Each project represents my commitment to understanding the intersection of technology, 
        mathematics, and nature.
      </p>
      
      <div className="space-y-12">
        {projects.map((project) => (
          <div key={project.id} className="glass-card transition-all duration-300">
            <div className="flex flex-col p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="rounded-md bg-primary/10 text-primary border-primary/20 dark:bg-[#24292e]/10 dark:hover:bg-[#24292e]/20 dark:text-[#efefef] dark:border-[#efefef]/20">
                  {project.type}
                </Badge>
                <Badge variant="outline" className="rounded-md bg-secondary/30 dark:bg-[#24292e]/10 dark:hover:bg-[#24292e]/20 dark:text-[#efefef] dark:border-[#efefef]/20">
                  {project.association}
                </Badge>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">{project.title}</h2>
              
              <div className="mb-6 overflow-x-auto">
                {project.content}
              </div>

              {project.links && (
                <div className="flex flex-wrap gap-3">
                  {project.links.github && (
                    <Badge 
                      variant="outline" 
                      className="rounded-md bg-[#24292e]/10 hover:bg-[#24292e]/20 text-[#24292e] hover:shadow-lg transition-all duration-300 light:shadow-gray-400/50 dark:bg-[#efefef]/10 dark:hover:bg-[#efefef]/20 dark:text-[#efefef] dark:border-[#efefef]/20"
                    >
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-2 py-1"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Badge>
                  )}
                  {project.links.youtube && (
                    <Badge 
                      variant="outline" 
                      className="rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-700 hover:shadow-lg transition-all duration-300 light:shadow-red-400/50 dark:bg-[#efefef]/10 dark:hover:bg-[#efefef]/20 dark:text-[#efefef] dark:border-[#efefef]/20"
                    >
                      <a
                        href={project.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-2 py-1"
                      >
                        <Youtube className="w-4 h-4" />
                        Video
                      </a>
                    </Badge>
                  )}
                  {project.links.projectPage && (
                    <Badge 
                      variant="outline" 
                      className="rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 hover:shadow-lg transition-all duration-300 light:shadow-blue-400/50 dark:bg-[#efefef]/10 dark:hover:bg-[#efefef]/20 dark:text-[#efefef] dark:border-[#efefef]/20"
                    >
                      <a
                        href={project.links.projectPage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-2 py-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Project Page
                      </a>
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
