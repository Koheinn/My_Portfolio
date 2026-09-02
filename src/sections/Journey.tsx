import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Code } from 'lucide-react';

const timeline = [
  {
    year: "Recent",
    title: "AI Engineering & Data Science",
    institution: "365 Data Science",
    desc: "Advanced studies focusing on machine learning algorithms, data analysis, and intelligent systems.",
    icon: <Code className="w-5 h-5 text-ai" />,
    type: "Data"
  },
  {
    year: "Previous",
    title: "Full-Stack Web Development",
    institution: "Fairway Institute",
    desc: "Comprehensive training in PHP Laravel, JavaScript, React, Node.js, Express, Redux, and TypeScript.",
    icon: <Briefcase className="w-5 h-5 text-brand" />,
    type: "Engineering"
  },
  {
    year: "Foundation",
    title: "NCC Level 3, 4, and 5 Diplomas in Computing",
    institution: "Academic",
    desc: "Strong theoretical and practical foundation in computer science and software development.",
    icon: <GraduationCap className="w-5 h-5 text-data" />,
    type: "Education"
  }
];

export default function Journey() {
  return (
    <section id="journey" className="py-24 relative w-full bg-surface/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Learning in Public</h2>
          <p className="text-lg text-accent-dim max-w-2xl mx-auto">
            The evolution from foundational computing to full-stack engineering, and into the realm of Data & AI.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-data to-transparent md:-translate-x-1/2" />
          
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-brand md:-translate-x-1/2 translate-y-6 md:translate-y-6 z-10" />
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                  <div className="glass-panel p-6 rounded-2xl border-white/5 hover:bg-white/5 transition-colors">
                    <div className={`flex items-center gap-3 mb-2 ${idx % 2 === 0 ? '' : 'md:justify-end'}`}>
                      {idx % 2 !== 0 && <span className="text-sm font-mono text-accent-dim">{item.year}</span>}
                      <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                        {item.icon}
                      </div>
                      {idx % 2 === 0 && <span className="text-sm font-mono text-accent-dim">{item.year}</span>}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <div className="text-brand text-sm mb-3 font-medium">{item.institution}</div>
                    <p className="text-accent-dim text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
