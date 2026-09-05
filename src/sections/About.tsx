import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Cloud, Code } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { icon: <Code className="w-6 h-6 text-brand" />, title: "Agile Problem Solving", desc: "Adapting quickly to complex challenges and delivering iterative value.", color: "from-brand" },
    { icon: <Database className="w-6 h-6 text-data" />, title: "Strategic Architecture", desc: "Aligning technical data solutions with core business objectives.", color: "from-data" },
    { icon: <Cloud className="w-6 h-6 text-ai" />, title: "Cross-Functional Sync", desc: "Bridging the gap between engineering, stakeholders, and product teams.", color: "from-ai" }
  ];

  const skillData = [
    { subject: 'Data Eng', score: 90 },
    { subject: 'Machine Learning', score: 85 },
    { subject: 'Cloud (AWS)', score: 80 },
    { subject: 'Software Arch', score: 95 },
    { subject: 'Full-Stack', score: 90 },
    { subject: 'DevOps', score: 75 },
  ];

  // Custom Tooltip for Radar Chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface/90 border border-white/10 p-3 rounded-lg backdrop-blur-md shadow-xl">
          <p className="text-white font-medium text-sm">{payload[0].payload.subject}</p>
          <p className="text-brand font-bold text-lg">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="about" ref={containerRef} className="py-24 relative w-full border-t border-white/5 bg-surface/30 perspective-1000 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, rotateX: 45, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg"
          >
            Professional Summary
          </motion.h2>
          <p className="text-lg md:text-xl text-accent-dim leading-relaxed mb-6 text-left md:text-center">
            As a dedicated computing professional in my final year of a BSc (Hons) Computer Science degree, my mission goes beyond writing code. I specialize in <strong className="text-white font-medium">translating complex business requirements into robust, scalable data pipelines and intelligent machine learning models.</strong>
          </p>
          <p className="text-lg md:text-xl text-accent-dim leading-relaxed mb-16 text-left md:text-center">
            Leveraging specialized training from IBM, DeepLearning.AI, and AWS, I bring a unique blend of deep technical expertise and strong interpersonal skills. Whether communicating architectural decisions to non-technical stakeholders or leading agile iterations, I am focused on delivering high-impact, cloud-native solutions that drive real-world results.
          </p>
        </motion.div>

        {/* Competencies and Skills Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          
          {/* Radar Chart (Left Side) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-square md:aspect-video lg:aspect-square relative flex items-center justify-center glass-panel rounded-3xl border border-white/5 p-4 md:p-8 hover:border-white/10 transition-colors shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent rounded-3xl pointer-events-none" />
            <h3 className="absolute top-8 left-8 text-xl font-bold text-white/90">Technical Proficiency</h3>
            <div className="w-full h-full mt-12">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={skillData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500 }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={false} 
                    axisLine={false} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Radar
                    name="Proficiency"
                    dataKey="score"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="#3B82F6"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Core Competencies Cards (Right Side) */}
          <div className="flex flex-col gap-5">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                className="w-full group"
              >
                <SpotlightCard spotlightColor="rgba(255,255,255,0.06)" className="glass-panel p-6 md:p-8 rounded-3xl flex flex-col gap-4 border border-white/5 hover:border-white/10 transition-all duration-500 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${step.color} to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Title Capsule */}
                  <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2 pr-6 self-start shadow-inner group-hover:bg-white/10 transition-colors duration-500">
                    <div className="p-2.5 bg-white/10 rounded-xl shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-500">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <div className="pl-2 pt-1">
                    <p className="text-[15px] text-accent-dim leading-relaxed">{step.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
