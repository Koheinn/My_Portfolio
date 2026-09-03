import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Database, Cloud, Code } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  const steps = [
    { icon: <Code className="w-6 h-6 text-blue-400" />, title: "Software Engineering", desc: "Building robust, scalable full-stack applications." },
    { icon: <Database className="w-6 h-6 text-data" />, title: "Data Engineering", desc: "Designing pipelines, architectures, and intelligent datasets." },
    { icon: <Cloud className="w-6 h-6 text-ai" />, title: "Cloud-Native Systems", desc: "Deploying scalable infrastructure with AWS & modern tools." }
  ];

  return (
    <section id="about" ref={containerRef} className="py-24 relative w-full border-t border-white/5 bg-surface/30 perspective-1000 overflow-hidden">
      {/* Background Decor */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 blur-[120px] rounded-full pointer-events-none" 
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          style={{ y: y1, opacity, scale }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, rotateX: 45, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg"
          >
            Who I Am
          </motion.h2>
          <p className="text-lg md:text-xl text-accent-dim leading-relaxed mb-6 text-left md:text-center">
            I am a computing professional in the final year of my BSc (Hons) Computer Science degree at STC Higher Education (University of Wolverhampton). With a foundational background in full-stack web development, my career trajectory is deeply rooted in software engineering, machine learning, and data pipelines.
          </p>
          <p className="text-lg md:text-xl text-accent-dim leading-relaxed mb-16 text-left md:text-center">
            Having specialized through IBM, DeepLearning.AI, and 365 Data Science, my primary goal is to innovate as a <strong className="text-white font-medium">Cloud-Native Data Engineer</strong>. I am currently pursuing an AWS Certified Data Engineer Associate qualification to cement my expertise in scalable, data-driven cloud infrastructure.
          </p>
        </motion.div>

        {/* Evolution Diagram */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, scale: 0.8, z: -50, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, z: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2, duration: 0.8, ease: "easeOut" }}
              className="flex items-center flex-col md:flex-row gap-4 perspective-1000"
            >
              <motion.div whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10 }} className="preserve-3d transition-all duration-300">
                <SpotlightCard spotlightColor="rgba(255,255,255,0.08)" className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center w-64 border border-white/5 hover:border-white/20 transition-colors shadow-2xl">
                  <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10 relative z-10 shadow-inner">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 relative z-10">{step.title}</h3>
                  <p className="text-sm text-accent-dim relative z-10">{step.desc}</p>
                </SpotlightCard>
              </motion.div>
              
              {idx < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 + 0.4, duration: 0.5 }}
                >
                  <ArrowRight className="w-6 h-6 text-white/20 hidden md:block" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
