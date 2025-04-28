
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
      title: "SnapNET: A generalizable robot-agnostic model for snap-fit assembly detection",
      content: (
        <div className="space-y-4 overflow-x-auto">
          <p>
            Using deep learning for robotic assembly, we developed a model that can detect snap-fit joints with an accuracy of <InlineMath math="\alpha = 95\%" />.
          </p>
          <div className="max-w-full overflow-x-auto py-4">
            <BlockMath math="\frac{\partial L}{\partial w} = \sum_{i=1}^n (y_i - \hat{y_i})x_i" />
          </div>
          <img 
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
            alt="Neural network architecture"
            className="max-h-64 object-contain mx-auto my-4"
          />
        </div>
      ),
      type: "Research",
      association: "IITGN Robotics",
      links: {
        github: "https://github.com/example/snapnet",
        youtube: "https://youtube.com/watch?v=example",
        projectPage: "https://example.com/project"
      }
    },
    {
      id: 2,
      title: "Biomimetic Learning Algorithms for Environmental Data",
      content: (
        <div className="space-y-4">
          <p>
            A project that implements nature-inspired algorithms to analyze complex environmental datasets, resulting in more accurate climate predictions than traditional models.
          </p>
        </div>
      ),
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      type: "Project",
      association: "Climate Research Lab"
    },
    {
      id: 3,
      title: "Mathematical Models of Dolphin Communication",
      content: (
        <div className="space-y-4">
          <p>
            A self-initiated study exploring patterns in dolphin vocalizations using advanced signal processing techniques and information theory.
          </p>
        </div>
      ),
      image: "/lovable-uploads/3e5317d4-2ec0-4a19-acc6-8e26d4eed6e7.png",
      type: "Self Project",
      association: "Independent"
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
