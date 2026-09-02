import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  created_at: string;
  fork: boolean;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Koheinn/repos?per_page=100')
      .then(res => res.json())
      .then((data: Repo[]) => {
        if (Array.isArray(data)) {
          // Prioritize AI/Data/ML projects or show all if none
          const relevant = data.filter(r => !r.fork);
          const aiProjects = relevant.filter(r => 
            r.name.toLowerCase().includes('ai') || 
            (r.description && r.description.toLowerCase().includes('ai')) ||
            (r.description && r.description.toLowerCase().includes('data')) ||
            (r.description && r.description.toLowerCase().includes('machine learning'))
          );
          
          // Make sure CareerPilot AI is prominently featured if it exists
          const careerPilot = relevant.find(r => r.name.toLowerCase().includes('careerpilot'));
          
          let finalProjects = [...aiProjects];
          
          if (careerPilot && !finalProjects.find(p => p.id === careerPilot.id)) {
            finalProjects.unshift(careerPilot);
          }
          
          // Fill up to 6 projects
          if (finalProjects.length < 6) {
            const others = relevant.filter(r => !finalProjects.find(p => p.id === r.id));
            others.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            finalProjects = [...finalProjects, ...others].slice(0, 6);
          }
          
          setRepos(finalProjects);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="py-24 relative w-full">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Intelligent Work</h2>
          <p className="text-lg text-accent-dim max-w-2xl mx-auto">
            A selection of projects exploring AI, data modeling, and robust software architecture.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative h-full glass-panel rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-white/5 border-white/5 hover:border-white/10"

              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-brand/30 transition-colors">
                      <Code2 className="w-6 h-6 text-brand" />
                    </div>
                    <div className="flex gap-3">
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-accent-dim hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noreferrer" className="text-accent-dim hover:text-white transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-brand transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-accent-dim mb-6 flex-grow line-clamp-3">
                    {repo.description || "No description provided."}
                  </p>
                  
                  {repo.language && (
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="w-2 h-2 rounded-full bg-data"></span>
                      <span className="text-sm font-mono text-accent-dim">{repo.language}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
