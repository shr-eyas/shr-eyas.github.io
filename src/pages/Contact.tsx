
import { Github, Mail, Linkedin, MapPin, BookOpen } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Bangalore, Karnataka, India",
      link: null
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "shreyas.kumar@icloud.com",
      link: "mailto:shreyas.kumar@icloud.com"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/shre-yas",
      link: "https://linkedin.com/in/shr-eyas"
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/shr-eyas",
      link: "https://github.com/shr-eyas"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Google Scholar",
      value: "scholar.google.com",
      link: "https://scholar.google.com/citations?user=anIVKo4AAAAJ&hl=en&authuser=2"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <p className="text-lg mb-8 text-center">
          Feel free to reach out through any of these channels
        </p>
        
        <div className="glass-card p-6 space-y-6">
          {contactInfo.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 transition-transform hover:translate-x-2"
            >
              <div className="bg-primary/5 p-2.5 rounded-full text-primary">
                {item.icon}
              </div>
              
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground mb-0.5">{item.label}</p>
                {item.link ? (
                  <a 
                    href={item.link} 
                    className="text-base hover:text-primary transition-colors truncate block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-base truncate">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
