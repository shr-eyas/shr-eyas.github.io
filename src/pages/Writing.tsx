
import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: number;
  title: string;
  abstract: string;
  url: string;
  expanded: boolean;
}

const Writing = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "How AI Can Learn from Genetics",
      abstract: "This article explores the fascinating connections between genetic algorithms and modern machine learning approaches, discussing how principles from evolution can inspire more efficient AI models.",
      url: "https://medium.com/shr-eyas/how-ai-can-learn-from-genetics",
      expanded: false
    },
    {
      id: 2,
      title: "The Right Philosophy for our Times",
      abstract: "An exploration of philosophical frameworks that might help us navigate the complex challenges of the modern world, from climate change to artificial intelligence.",
      url: "https://medium.com/shr-eyas/the-right-philosophy-for-our-times",
      expanded: false
    },
    {
      id: 3,
      title: "The Illusion of Intelligence",
      abstract: "This piece examines our perceptions of intelligence in AI systems, and questions whether what we call 'intelligence' is merely pattern recognition or something deeper.",
      url: "https://medium.com/shr-eyas/the-illusion-of-intelligence",
      expanded: false
    }
  ]);

  const toggleExpand = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, expanded: !article.expanded } : article
    ));
  };

  return (
    <div className="py-16 px-6 md:px-12 lg:px-24">
      {/* <h1 className="text-5xl font-bold mb-8">Writing</h1> */}
      
      <p className="text-lg mb-12 max-w-8xl">
        I write about nature, mathematics, philosophy, robotics, or anything that crosses my mind. 
        Here are a few of my recent favorite articles. For all my writing, visit my{" "}
        <a 
          href="https://medium.com/shr-eyas" 
          className="underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Medium
        </a>.
      </p>
      
      <div className="space-y-8">
        {articles.map((article) => (
          <div key={article.id} className="border-t border-border pt-6 pb-2">
            <div className="flex justify-between items-center">
              <a 
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-medium hover:underline"
              >
                {article.title}
              </a>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => toggleExpand(article.id)}
                aria-label={article.expanded ? "Collapse article" : "Expand article"}
              >
                <Plus 
                  className={`h-5 w-5 transition-transform ${article.expanded ? 'rotate-45' : ''}`} 
                />
              </Button>
            </div>
            
            {article.expanded && (
              <div className="mt-4 text-muted-foreground animate-accordion-down">
                <p>{article.abstract}</p>
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-primary hover:text-primary/80"
                >
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Writing;
