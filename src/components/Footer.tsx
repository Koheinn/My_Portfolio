export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 border-t border-white/5 bg-surface text-center">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-mono text-accent-dim">
          © {year} Heinn Htet Zan.
        </div>
        
        <div className="text-sm text-accent-dim">
          Data Professional & Data + AI Enthusiast
        </div>
        
        <div className="flex gap-4 text-sm font-mono text-accent-dim">
          <a href="https://github.com/Koheinn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <span>/</span>
          <a href="https://www.linkedin.com/in/heinn-htet-zan-040794291" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
