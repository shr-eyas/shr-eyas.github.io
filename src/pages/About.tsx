
import { AspectRatio } from "@/components/ui/aspect-ratio";

const About = () => {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6 text-justify leading-relaxed">
          <p>
            I'm a <span className="font-bold">predoctoral researcher</span> at <a href="https://research.iitgn.ac.in/robotics/" className="underline" target="_blank" rel="noopener noreferrer">IITGN Robotics Laboratory</a>, 
            with a research focus at the intersection of robotics, control, and learning. I am advised by Prof. Harish P.M. and 
            supported by <a href="https://addverb.com/" className="underline" target="_blank" rel="noopener noreferrer">Addverb Technologies</a>. 
            I completed my undergraduate degree in Mechanical Engineering from Indian Institute of Engineering Science and Technology (IIEST).
          </p>
          
          <p>
            Much of my thinking is shaped by a deep curiosity of how systems adapt, interact, and evolve
            - and I've always been drawn to understanding them using the language of physics and mathematics.
            I tend to find beauty in structured systems, and yet am drawn to thier unpredictability and uncertainty.
          </p>

          <p>
          <span className="font-bold">Creative Outlet.</span> Outside of robotics, I'm deeply interested in nature, music, and philosophy. 
          I enjoy playing guitar, writing about the human condition, and taking reflective photo-walks. 
          </p>

          <p>
          <span className="block font-bold text-lg -mt-1 mb-2">
            Research Interest
          </span>
            My vision is to build generalizable robotic systems capable of physically interacting with complex environments 
            — in ways that are robust, safe, and adaptable. I am particularly fascinated by how we can combine conventional 
            control theory with data-driven learning to achieve reliable, real-world manipulation. I aim to contribute towards 
            making contact-rich robot behavior both intelligent and reliable — not just in the lab, but in everyday human settings.
          </p>
          
          {/* <p>
            follow me on <a href="https://medium.com/shr-eyas" className="underline" target="_blank" rel="noopener noreferrer">medium</a>, 
            <a href="#" className="underline"> instagram</a>, 
            and <a href="#" className="underline"> twitter.</a> View my code on 
            <a href="https://github.com" className="underline" target="_blank" rel="noopener noreferrer"> GitHub.</a>
          </p> */}
        </div>
        
        <div className="lg:w-1/3 flex items-center">
          <div className="w-full max-w-[300px] mx-auto">
            <AspectRatio ratio={1/1} className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                alt="Shreyas Kumar" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
