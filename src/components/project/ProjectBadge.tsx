
import { Badge } from "@/components/ui/badge";

interface ProjectBadgeProps {
  type: string;
  association: string;
}

export const ProjectBadge = ({ type, association }: ProjectBadgeProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge variant="outline" className="rounded-md bg-primary/10 text-primary border-primary/20 dark:bg-[#24292e]/10 dark:hover:bg-[#24292e]/20 dark:text-[#efefef] dark:border-[#efefef]/20">
        {type}
      </Badge>
      <Badge variant="outline" className="rounded-md bg-secondary/30 dark:bg-[#24292e]/10 dark:hover:bg-[#24292e]/20 dark:text-[#efefef] dark:border-[#efefef]/20">
        {association}
      </Badge>
    </div>
  );
};
