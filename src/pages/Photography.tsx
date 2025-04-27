import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Photography = () => {
  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      alt: "Blue starry night",
      caption: "Night sky in the mountains"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      alt: "Ocean wave",
      caption: "Pacific Ocean waves at sunset"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
      alt: "Humpback whale",
      caption: "Humpback whale breaching"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f",
      alt: "Deer in forest",
      caption: "Deer spotted in the North Cascades"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="py-16 px-6 md:px-12 lg:px-24">
      {/* <h1 className="text-5xl font-bold mb-8">Photography</h1> */}
      
      <p className="text-lg mb-12 max-w-8xl">
        Photography allows me to capture the beauty and complexity of nature. My camera becomes my 
        tool for observation and documentation, helping me connect more deeply with natural environments.
      </p>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden rounded-lg">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out
                ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 glass-card hover:bg-white/30 z-20"
          onClick={goToPrev}
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 glass-card hover:bg-white/30 z-20"
          onClick={goToNext}
          aria-label="Next photo"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
        
        <div className="flex justify-center mt-4 space-x-3">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'glass-card scale-125' 
                  : 'bg-foreground/20 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photography;
