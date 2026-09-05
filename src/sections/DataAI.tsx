import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

const areas = [
  {
    title: 'Data Engineering & Pipelines',
    skills: ['Architecting scalable ETL/ELT workflows', 'AWS Cloud Services (S3, EMR, Redshift)', 'High-performance processing with Apache Spark', 'Data Warehousing & Data Lakes', 'Optimizing Relational & NoSQL databases'],
    color: 'border-brand/30 hover:border-brand',
    gradient: 'from-brand/10 to-transparent'
  },
  {
    title: 'Machine Learning & Insights',
    skills: ['Predictive Modeling & Classification', 'Deploying ML pipelines to production', 'Deep Learning & Neural Networks', 'Feature Engineering for robust datasets', 'TensorFlow, PyTorch, & Scikit-Learn'],
    color: 'border-data/30 hover:border-data',
    gradient: 'from-data/10 to-transparent'
  },
  {
    title: 'Generative AI Integration',
    skills: ['End-to-End LLM Integration', 'Retrieval-Augmented Generation (RAG)', 'Context-aware Prompt Engineering', 'LangChain & LlamaIndex frameworks', 'Automating workflows with AI agents'],
    color: 'border-ai/30 hover:border-ai',
    gradient: 'from-ai/10 to-transparent'
  },
  {
    title: 'Software & Infrastructure',
    skills: ['Building robust REST APIs & Microservices', 'Full-stack development (React, Node.js)', 'Python & TypeScript mastery', 'CI/CD Pipelines & DevOps automation', 'Containerization with Docker'],
    color: 'border-orange-500/30 hover:border-orange-500',
    gradient: 'from-orange-500/10 to-transparent'
  }
];

export default function DataAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <section id="data-ai" ref={containerRef} className="py-24 relative w-full overflow-hidden perspective-1000">
      {/* Parallax Decor Element */}
      <motion.div 
        style={{ y: yBg, rotate: useTransform(scrollYProgress, [0, 1], [0, 45]) }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none"
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50, z: -50 }}
          whileInView={{ opacity: 1, y: 0, z: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-xl">Technical Capabilities & Value</h2>
          <p className="text-lg text-accent-dim max-w-2xl mx-auto text-shadow">
            Combining rigorous cloud infrastructure expertise with advanced machine learning to deliver complete, scalable solutions that solve real business problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, idx) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.8, type: "spring", stiffness: 50 }}
              className="h-full"
            >
              <SpotlightCard className={`h-full glass-panel p-8 border transition-all duration-500 ${area.color} bg-gradient-to-b ${area.gradient} shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]`}>
                <h3 className="text-2xl font-semibold mb-6 relative z-10">{area.title}</h3>
                <ul className="space-y-3 relative z-10">
                  {area.skills.map(skill => (
                    <li key={skill} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 mr-3 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      <span className="text-accent-dim">{skill}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
