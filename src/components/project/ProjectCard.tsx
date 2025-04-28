
import { ReactNode } from "react";
import { ProjectBadge } from "./ProjectBadge";
import { ProjectLinks } from "./ProjectLinks";

interface ProjectCardProps {
  id: number;
  title: string;
  content: ReactNode;
  image?: string;
  type: "Research" | "Project" | "Self Project" | "Company" | "Academic";
  association: string;
  links?: {
    github?: string;
    youtube?: string;
    projectPage?: string;
  };
}

export const ProjectCard = ({ id, title, content, type, association, links }: ProjectCardProps) => {
  return (
    <div key={id} className="glass-card">
      <div className="flex flex-col p-6 md:p-8">
        <ProjectBadge type={type} association={association} />
        
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        
        <div className="mb-6 overflow-x-auto">
          {content}
        </div>

        <ProjectLinks links={links} />
      </div>
    </div>
  );
};
