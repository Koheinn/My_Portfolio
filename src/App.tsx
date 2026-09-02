import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import DataAI from './sections/DataAI';
import Ecosystem from './sections/Ecosystem';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      <Navbar scrollY={scrollY} />
      
      <main className="flex flex-col w-full">
        <Hero scrollY={scrollY} />
        <About />
        <DataAI />
        <Ecosystem />
        <Projects />
        <Journey />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
