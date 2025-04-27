
import { Badge } from "@/components/ui/badge";
import { Github, Youtube } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  type: "Research" | "Project" | "Self Project" | "Company" | "Academic";
  association: string;
  links?: {
    github?: string;
    youtube?: string;
  };
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "SnapNET: A generalizable robot-agnostic model for snap-fit assembly detection",
      description: "This research focuses on developing a neural network architecture that can accurately detect snap-fit joints across various robotic platforms, enhancing manufacturing automation capabilities.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      type: "Research",
      association: "IITGN Robotics",
      links: {
        github: "https://github.com/example/snapnet",
        youtube: "https://youtube.com/watch?v=example"
      }
    },
    {
      id: 2,
      title: "Biomimetic Learning Algorithms for Environmental Data",
      description: "A project that implements nature-inspired algorithms to analyze complex environmental datasets, resulting in more accurate climate predictions than traditional models.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      type: "Project",
      association: "Climate Research Lab"
    },
    {
      id: 3,
      title: "Mathematical Models of Dolphin Communication",
      description: "A self-initiated study exploring patterns in dolphin vocalizations using advanced signal processing techniques and information theory.",
      image: "/lovable-uploads/3e5317d4-2ec0-4a19-acc6-8e26d4eed6e7.png",
      type: "Self Project",
      association: "Independent"
    },
    {
      id: 4,
      title: "AI-Enhanced Visual Recognition for Wildlife Conservation",
      description: "A machine learning system that automatically identifies endangered species in camera trap footage, significantly reducing manual processing time.",
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
              
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="rounded-lg max-w-2xl h-48 object-contain mx-auto mb-6"
                />
              )}
              
              <p className="text-muted-foreground mb-6">{project.description}</p>

              {project.links && (
                <div className="flex gap-3">
                  {project.links.github && (
                    <Badge 
                      variant="outline" 
                      className="rounded-md bg-[#24292e]/10 hover:bg-[#24292e]/20 text-[#24292e] dark:bg-[#efefef]/10 dark:hover:bg-[#efefef]/20 dark:text-[#efefef] dark:border-[#efefef]/20"
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
                      className="rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:bg-[#efefef]/10 dark:hover:bg-[#efefef]/20 dark:text-[#efefef] dark:border-[#efefef]/20"
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
