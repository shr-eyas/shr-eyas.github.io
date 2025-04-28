import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="h-screen lg:overflow-hidden overflow-auto bg-background text-foreground px-6 md:px-12 lg:px-24 flex items-center relative animate-fade-in">
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-3/5 space-y-10 lg:-mt-32 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-snug lg:leading-[1.3]">
              Exploring the intersection of nature and mathematical logic
            </h1>
            <div className="flex flex-col gap-2">
              <Link 
                to="/about" 
                className="group inline-flex items-center text-lg text-foreground/90 hover:text-foreground transition-colors"
              >
                get to know me <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/projects" 
                className="group inline-flex items-center text-lg text-foreground/90 hover:text-foreground transition-colors"
              >
                see my work <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:absolute lg:left-[60%] lg:-top-56 lg:w-[600px] w-[400px] z-0 relative">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-2xl opacity-70"></div>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/ad57e6ca-c739-4289-a117-3a3c8772c7c5.png"
                alt="Geometric dolphin illustration"
                className="w-full h-auto relative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
