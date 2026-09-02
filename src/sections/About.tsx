import { motion } from 'framer-motion';
import { ArrowRight, Database, Brain, Code } from 'lucide-react';

export default function About() {
  const steps = [
    { icon: <Code className="w-6 h-6 text-blue-400" />, title: "Software Engineering", desc: "Building robust, scalable applications." },
    { icon: <Database className="w-6 h-6 text-data" />, title: "Data Analytics", desc: "Extracting meaning from complex datasets." },
    { icon: <Brain className="w-6 h-6 text-ai" />, title: "Machine Learning & AI", desc: "Creating intelligent predictive models." }
  ];

  return (
    <section id="about" className="py-24 relative w-full border-t border-white/5 bg-surface/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Who I Am</h2>
          <p className="text-lg md:text-xl text-accent-dim leading-relaxed mb-16 text-left md:text-center">
            I am a dedicated computing professional with NCC Level 3, 4, and 5 Diplomas in Computing. My background in full-stack web development laid the foundation, but my passion lies at the intersection of data and intelligence. I've enhanced my skills through AI Engineering and Data Science training, evolving from a software engineer into a data professional who builds intelligent products.
          </p>
        </motion.div>

        {/* Evolution Diagram */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="flex items-center flex-col md:flex-row gap-4"
            >
              <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center w-64 hover:bg-white/5 transition-colors">
                <div className="p-4 rounded-full bg-white/5 mb-4 border border-white/10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-accent-dim">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-white/20 hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
