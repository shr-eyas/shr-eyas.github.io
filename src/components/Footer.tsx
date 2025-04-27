
const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-6 px-6 md:px-12 text-center text-sm text-muted-foreground mt-auto">
      <p>© {year} Shreyas.</p>
    </footer>
  );
};

export default Footer;
