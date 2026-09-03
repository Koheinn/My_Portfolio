import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Code, Cloud, Database, Brain, LineChart, Layout, BookOpen } from 'lucide-react';

const timeline = [
  {
    year: "Future Goal",
    title: "AWS Certified Data Engineer Associate",
    institution: "Amazon Web Services",
    desc: "Targeting official certification to solidify cloud-native data engineering expertise.",
    icon: <Cloud className="w-5 h-5 text-brand" />,
    type: "Data"
  },
  {
    year: "Present",
    title: "BSc (Hons) Computer Science",
    institution: "STC Higher Education (University of Wolverhampton)",
    desc: "Final year student focusing on advanced computer science principles and software engineering.",
    icon: <GraduationCap className="w-5 h-5 text-data" />,
    type: "Education"
  },
  {
    year: "Present",
    title: "Data Engineering Professional",
    institution: "DeepLearning.AI (Coursera)",
    desc: "Specializing in building robust data pipelines, data warehouses, and cloud infrastructure.",
    icon: <Database className="w-5 h-5 text-ai" />,
    type: "Data"
  },
  {
    year: "Recent",
    title: "Machine Learning Specialization",
    institution: "DeepLearning.AI (Andrew Ng)",
    desc: "Mastering fundamental ML algorithms, neural networks, and predictive modeling.",
    icon: <Brain className="w-5 h-5 text-purple-400" />,
    type: "Data"
  },
  {
    year: "Recent",
    title: "Software Engineering",
    institution: "IBM",
    desc: "Advanced studies in enterprise software architecture, cloud concepts, and scalable systems.",
    icon: <Code className="w-5 h-5 text-blue-400" />,
    type: "Engineering"
  },
  {
    year: "Previous",
    title: "AI Engineering & Data Science",
    institution: "365 Data Science",
    desc: "Advanced studies focusing on machine learning algorithms, data analysis, and intelligent systems.",
    icon: <LineChart className="w-5 h-5 text-green-400" />,
    type: "Data"
  },
  {
    year: "Previous",
    title: "Full-Stack Web Development",
    institution: "Fairway Institute",
    desc: "Comprehensive training in PHP Laravel, JavaScript, React, Node.js, Express, Redux, and TypeScript.",
    icon: <Layout className="w-5 h-5 text-orange-400" />,
    type: "Engineering"
  },
  {
    year: "Foundation",
    title: "NCC Level 3, 4, and 5 Diplomas in Computing",
    institution: "Academic",
    desc: "Strong theoretical and practical foundation in computer science and software development.",
    icon: <BookOpen className="w-5 h-5 text-gray-400" />,
    type: "Education"
  }
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section id="journey" ref={containerRef} className="py-24 relative w-full bg-surface/30 perspective-1000 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">Learning in Public</h2>
          <p className="text-lg text-accent-dim max-w-2xl mx-auto text-shadow">
            The evolution from foundational computing to full-stack engineering, and into the realm of Data & AI.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          
          {/* Animated Main Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-brand via-data to-ai md:-translate-x-1/2 origin-top shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
          />
          
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50, rotateY: idx % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 preserve-3d ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-brand md:-translate-x-1/2 translate-y-6 md:translate-y-6 z-10 shadow-[0_0_15px_rgba(59,130,246,0.8)]" 
                />
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                  <motion.div 
                    whileHover={{ scale: 1.05, z: 20 }}
                    className="glass-panel p-6 rounded-2xl border-white/5 hover:border-brand/30 transition-all duration-300 shadow-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] preserve-3d"
                  >
                    <div className={`flex items-center gap-3 mb-2 ${idx % 2 === 0 ? '' : 'md:justify-end'}`}>
                      {idx % 2 !== 0 && <span className="text-sm font-mono text-accent-dim">{item.year}</span>}
                      <div className="p-2 bg-white/5 rounded-lg border border-white/10 shadow-inner">
                        {item.icon}
                      </div>
                      {idx % 2 === 0 && <span className="text-sm font-mono text-accent-dim">{item.year}</span>}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1 relative z-10">{item.title}</h3>
                    <div className="text-brand text-sm mb-3 font-medium relative z-10">{item.institution}</div>
                    <p className="text-accent-dim text-sm leading-relaxed relative z-10">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
