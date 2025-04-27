
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="h-screen lg:overflow-hidden overflow-auto bg-background text-foreground px-6 md:px-12 lg:px-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-2/3 space-y-8 lg:-mt-40 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-snug lg:leading-tight max-w-3xl">
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

          <div className="lg:w-[45%] relative">
            <div className="glow-effect">
              <img 
                src="/lovable-uploads/ad57e6ca-c739-4289-a117-3a3c8772c7c5.png"
                alt="Geometric dolphin illustration"
                className="w-full max-w-[400px] lg:max-w-[500px] h-auto fade-in relative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
