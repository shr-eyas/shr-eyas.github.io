
const About = () => {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-24">
      {/* <h1 className="text-5xl font-bold mb-12">About</h1> */}
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6 font-mono leading-relaxed">
          <p>I'm a student from Gujarat, India.</p>
          
          <p>
            Inspired by nature since seeing a wild Snowy Owl in 2012, 
            I'm a naturalist and wildlife <span className="italic">saba</span> photographer.
            Naturally, as someone passionate about nature, I engage in local 
            climate activism and raise awareness through art and photography, 
            as well as <a href="#" className="underline">a role-playing game</a> I am helping develop.
          </p>
          
          <p>
            I have recently been spending most of my time doing 
            mathematics and computer science, which you can explore on this site.
          </p>
          
          <p>
            you can contact me at <a href="mailto:contact@shreyaskumar.com" className="underline">contact@shreyaskumar.com</a>
          </p>
          
          <p>
            to receive updates every two months on what I'm doing, sign up for <a href="#" className="underline">my newsletter.</a>
          </p>
          
          <p>
            follow me on <a href="https://medium.com/shr-eyas" className="underline" target="_blank" rel="noopener noreferrer">medium</a>, 
            <a href="#" className="underline"> instagram</a>, 
            and <a href="#" className="underline"> twitter.</a> View my code on 
            <a href="https://github.com" className="underline" target="_blank" rel="noopener noreferrer"> GitHub.</a>
          </p>
        </div>
        
        <div className="lg:w-1/3">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
            alt="Shreyas Kumar" 
            className="rounded-lg shadow-lg max-w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
