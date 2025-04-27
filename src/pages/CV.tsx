
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CV = () => {
  // Placeholder for CV PDF - you would need to add your actual CV
  const cvUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="py-16 px-6 md:px-12 lg:px-24">
      <div className="flex justify-between items-center mb-8">
        {/* <h1 className="text-5xl font-bold">CV</h1> */}
        
        <a href={cvUrl} download="Shreyas_Kumar_CV.pdf">
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </a>
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      
      <div className={`w-full ${isLoading ? 'hidden' : 'block'}`}>
        <iframe
          src={cvUrl}
          className="w-full h-[800px] border rounded-lg"
          onLoad={handleLoad}
          title="CV Document"
        ></iframe>
      </div>
    </div>
  );
};

export default CV;
