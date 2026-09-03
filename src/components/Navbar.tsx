import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar({ scrollY }: { scrollY: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Cloud & Data', href: '#data-ai' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ];

  const isScrolled = scrollY > 50;

  return (
    <>
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-data via-brand to-ai origin-left"
        style={{ scaleX }}
      />

      <nav className={`fixed top-1 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="#home" className="text-xl font-mono font-bold tracking-tighter z-50">
            <span className="text-white">Heinn</span>
            <span className="text-accent-dim">.Data</span>
          </a>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center space-x-1 glass-panel rounded-full px-6 py-2 transition-all ${isScrolled ? 'bg-surface/80 shadow-lg' : 'bg-transparent border-transparent'}`}>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-accent hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute inset-x-4 -bottom-1 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-semibold text-white hover:text-brand transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </>
  );
}
