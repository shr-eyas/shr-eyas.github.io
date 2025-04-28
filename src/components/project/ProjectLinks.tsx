
import { Badge } from "@/components/ui/badge";
import { Github, Youtube, ExternalLink } from "lucide-react";

interface ProjectLinksProps {
  links?: {
    github?: string;
    youtube?: string;
    projectPage?: string;
  };
}

export const ProjectLinks = ({ links }: ProjectLinksProps) => {
  if (!links) return null;
  
  return (
    <div className="flex flex-wrap gap-3">
      {links.github && (
        <Badge 
          variant="outline" 
          className="rounded-md badge-hover-effect bg-[#24292e]/10 hover:bg-[#24292e]/20 text-[#24292e] transition-all duration-300 light:shadow-gray-400/50 dark:bg-[#efefef]/10 dark:hover:bg-[#efefef]/20 dark:text-[#efefef] dark:border-[#efefef]/20"
        >
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-2 py-1"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </Badge>
      )}
      {links.youtube && (
        <Badge 
          variant="outline" 
          className="rounded-md badge-hover-effect bg-red-500/10 hover:bg-red-500/20 text-red-700 transition-all duration-300 light:shadow-red-400/50 dark:bg-[#efefef]/10 dark:hover:bg-[#efefef]/20 dark:text-[#efefef] dark:border-[#efefef]/20"
        >
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-2 py-1"
          >
            <Youtube className="w-4 h-4" />
            Video
          </a>
        </Badge>
      )}
      {links.projectPage && (
        <Badge 
          variant="outline" 
          className="rounded-md badge-hover-effect bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 transition-all duration-300 light:shadow-blue-400/50 dark:bg-[#efefef]/10 dark:hover:bg-[#efefef]/20 dark:text-[#efefef] dark:border-[#efefef]/20"
        >
          <a
            href={links.projectPage}
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
  );
};
