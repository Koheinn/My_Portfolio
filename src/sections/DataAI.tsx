import { motion } from 'framer-motion';

const areas = [
  {
    title: 'Data Science',
    skills: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Plotly', 'Scikit-learn'],
    color: 'border-data/30 hover:border-data',
    gradient: 'from-data/10 to-transparent'
  },
  {
    title: 'Machine Learning',
    skills: ['Regression', 'Classification', 'Clustering', 'Anomaly Detection', 'Recommendation Systems', 'Feature Engineering', 'Model Evaluation'],
    color: 'border-blue-500/30 hover:border-blue-500',
    gradient: 'from-blue-500/10 to-transparent'
  },
  {
    title: 'AI',
    skills: ['Generative AI', 'AI Application Development', 'LLM APIs', 'AI-assisted applications', 'Prompt engineering', 'AI integration'],
    color: 'border-ai/30 hover:border-ai',
    gradient: 'from-ai/10 to-transparent'
  },
  {
    title: 'Engineering',
    skills: ['JavaScript / TypeScript', 'React', 'Node.js', 'REST APIs', 'Databases', 'Docker', 'Kubernetes', 'Cloud / DevOps'],
    color: 'border-orange-500/30 hover:border-orange-500',
    gradient: 'from-orange-500/10 to-transparent'
  }
];

export default function DataAI() {
  return (
    <section id="data-ai" className="py-24 relative w-full">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Where Data Meets Intelligence</h2>
          <p className="text-lg text-accent-dim max-w-2xl mx-auto">
            A comprehensive toolkit spanning data manipulation, machine learning modeling, AI integration, and robust software engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, idx) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`glass-panel p-8 rounded-3xl border transition-all duration-500 ${area.color} bg-gradient-to-b ${area.gradient} hover:-translate-y-2 hover:shadow-2xl`}
            >
              <h3 className="text-2xl font-semibold mb-6">{area.title}</h3>
              <ul className="space-y-3">
                {area.skills.map(skill => (
                  <li key={skill} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 mr-3 shrink-0" />
                    <span className="text-accent-dim">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
