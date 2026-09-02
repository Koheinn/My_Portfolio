import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

function DataParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 3000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

export default function Hero({ scrollY }: { scrollY: number }) {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <DataParticles />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-1/2 flex flex-col items-center lg:items-start"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-sm font-mono tracking-wider text-accent">Heinn Htet Zan</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            I turn <span className="text-gradient-data">data</span> into <br className="hidden md:block"/>
            <span className="text-gradient-ai">intelligence.</span>
          </h1>
          <p className="text-lg md:text-xl text-accent-dim mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Data Professional & Data + AI Enthusiast building intelligent, data-driven experiences and software.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#projects" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-accent transition-colors w-full sm:w-auto">
              Explore Projects
            </a>
            <a href="#about" className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors w-full sm:w-auto flex items-center justify-center">
              My Journey
            </a>
          </div>
        </motion.div>

        {/* Profile Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center lg:justify-end"
        >
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 group">
            {/* Glowing aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-data via-brand to-ai rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 animate-pulse"></div>
            {/* Image container */}
            <div className="absolute inset-4 bg-surface/50 rounded-full border border-white/20 z-10 overflow-hidden shadow-2xl backdrop-blur-sm">
              <img 
                src="https://github.com/Koheinn.png" 
                alt="Heinn Htet Zan" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-accent-dim animate-bounce"
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <span className="text-xs font-mono mb-2 tracking-widest uppercase">Scroll</span>
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
