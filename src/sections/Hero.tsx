import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

function DataParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1200; // Reduced for performance
  
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
      // Base rotation
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      
      // Interactive rotation based on pointer
      const targetX = state.pointer.x * 0.2;
      const targetY = state.pointer.y * 0.2;
      
      ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.05;
      ref.current.rotation.x += (-targetY - ref.current.rotation.x) * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export default function Hero({ scrollY }: { scrollY: number }) {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const scaleText = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden perspective-1000">
      {/* 3D Background with Parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
          <ambientLight intensity={0.5} />
          <DataParticles />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between">
        <motion.div 
          style={{ opacity: opacityText, y: yText, scale: scaleText }}
          initial={{ opacity: 0, rotateX: 20, z: -100 }}
          animate={{ opacity: 1, rotateX: 0, z: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 flex flex-col items-center lg:items-start"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="text-sm font-mono tracking-wider text-accent">Heinn Htet Zan</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight drop-shadow-2xl">
            Architecting <br className="hidden md:block"/>
            <span className="text-gradient-data">cloud-native</span> <br className="hidden md:block"/>
            <span className="text-gradient-ai">data systems.</span>
          </h1>
          <p className="text-lg md:text-xl text-accent-dim mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-shadow">
            Cloud-Native Data Engineer & ML Enthusiast. Building scalable data pipelines, intelligent models, and robust cloud infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-accent hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all w-full sm:w-auto"
            >
              Explore Projects
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#about" 
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors w-full sm:w-auto flex items-center justify-center backdrop-blur-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              My Journey
            </motion.a>
          </div>
        </motion.div>

        {/* Profile Image Section */}
        <motion.div 
          style={{ opacity: opacityText, y: useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"]) }}
          initial={{ opacity: 0, scale: 0.5, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center lg:justify-end"
        >
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 group perspective-1000">
            {/* Glowing aura */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-data via-brand to-ai rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"
            />
            {/* Image container */}
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: -10, rotateX: 10 }}
              className="absolute inset-4 bg-surface/50 rounded-full border border-white/20 z-10 overflow-hidden shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out preserve-3d"
            >
              <img 
                src="https://github.com/Koheinn.png" 
                alt="Heinn Htet Zan" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
              />
            </motion.div>
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
