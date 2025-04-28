
interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export const ProjectImage = ({ src, alt, caption }: ProjectImageProps) => {
  return (
    <div className="flex flex-col items-center">
      <img 
        src={src}
        alt={alt}
        className="rounded-lg object-contain w-auto h-auto max-h-48"
      />
      {caption && <span className="text-sm text-muted-foreground mt-2">{caption}</span>}
    </div>
  );
};
