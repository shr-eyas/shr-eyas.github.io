
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { ProjectCard } from "@/components/project/ProjectCard";
import { ProjectImage } from "@/components/project/ProjectImage";
import { getRandomCaption } from "@/components/project/ProjectUtils";

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
    paper?: string;
  };
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Manipulating at the Edge of Instability",
      content: (
        <div className="space-y-4 overflow-x-auto">
          <p>A deep dive into mathematical patterns found in nature, featuring multiple equations and visualizations.</p>
          
          <div className="my-8"></div> {/* Added explicit spacing here */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <ProjectImage 
              src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
              alt="Starry night patterns"
              caption="Testing caption 1"
            />
            <ProjectImage 
              src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
              alt="Natural patterns"
              caption="Testing caption 2"
            />
          </div>
          <p>A deep dive into mathematical patterns found in nature, featuring multiple equations and visualizations.</p>
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
      title: "Control Barrier Functions for Safe Reinforcement Learning",
      content: (
        <div className="space-y-4">
          <p>
            An open-source algorithm for tracking wildlife movement patterns using satellite data.
          </p>
          
          <div className="my-8"></div> {/* Added explicit spacing here */}
          
          <div className="flex flex-col items-center mb-4">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Wildlife tracking visualization"
              className="rounded-lg object-contain w-auto h-auto max-h-64"
            />
            <span className="text-sm text-muted-foreground mt-2">{getRandomCaption()}</span>
          </div>
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
      title: "Iterative Learning for Manipulation and Grasping Against Unknown Resistance Fields that is Generalizable to Arbitrary Trajectories",
      content: (
        <div className="space-y-4">
          <p>Interactive visualization of neural network architectures and their learning processes.</p>
          
          <div className="my-8"></div> {/* Added explicit spacing here */}
          
          <div className="flex flex-col items-center mb-4">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Neural network visualization"
              className="rounded-lg object-contain w-auto h-auto max-h-64"
            />
            <span className="text-sm text-muted-foreground mt-2">{getRandomCaption()}</span>
          </div>
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
      title: "Adaptive Fuzzy Predictor based Fast Terminal Sliding Mode Controller Design for Two-link Robot Manipulator",
      content: (
        <div className="space-y-4">
          <p>
            A machine learning system that automatically identifies endangered species in camera trap footage.
          </p>
          
          <div className="my-8"></div> {/* Added explicit spacing here */}
          
          {/* <div className="flex flex-col items-center mb-4">
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDFtbzlvNWU4Ym5hdjg5aGtrMjA3aG1jamdjazBkOGRlZXdtbDk4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bugDTSonKZ3ONry/giphy.gif"
              alt="AI visualization gif"
              className="rounded-lg object-contain w-auto h-auto max-h-64"
            />
            <span className="text-sm text-muted-foreground mt-2">{getRandomCaption()}</span>
          </div> */}

            <div className="flex flex-col items-center mb-4">
              <img 
                src="/lovable-uploads/architecture.drawio.png"
                alt="Proposed Architecture"
                className="rounded-lg object-contain w-auto h-auto max-h-96"
              />
              <span className="text-sm text-muted-foreground mt-2">Architecture of proposed AFP-FTSMC</span>
            </div>

        </div>
      ),
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      type: "Research",
      association: "EECS, IIEST",
      links: {
        paper: "https://ieeexplore.ieee.org/document/10883745",
      }
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
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            content={project.content}
            image={project.image}
            type={project.type}
            association={project.association}
            links={project.links}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
