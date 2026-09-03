import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, Code2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

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

const fallbackRepos: Repo[] = [
  {
    id: 1,
    name: "CareerPilot-AI",
    description: "An AI-powered career guidance platform using machine learning to recommend optimal career paths.",
    html_url: "https://github.com/Koheinn/CareerPilot-AI",
    homepage: "",
    language: "TypeScript",
    created_at: new Date().toISOString(),
    fork: false
  },
  {
    id: 2,
    name: "Data-Engineering-Pipeline",
    description: "Automated ETL pipelines and data warehousing concepts using AWS and Python.",
    html_url: "https://github.com/Koheinn/Data-Engineering-Pipeline",
    homepage: "",
    language: "Python",
    created_at: new Date().toISOString(),
    fork: false
  },
  {
    id: 3,
    name: "ML-Predictive-Models",
    description: "A collection of predictive models and neural networks from the Machine Learning Specialization.",
    html_url: "https://github.com/Koheinn/ML-Predictive-Models",
    homepage: "",
    language: "Jupyter Notebook",
    created_at: new Date().toISOString(),
    fork: false
  }
];

export default function Projects() {
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('https://api.github.com/users/Koheinn/repos?per_page=100&sort=created&direction=desc')
      .then(res => {
        if (!res.ok) throw new Error('API Rate Limit or Network Error');
        return res.json();
      })
      .then((data: Repo[]) => {
        if (Array.isArray(data)) {
          const relevant = data.filter(r => !r.fork);
          setAllRepos(relevant.length > 0 ? relevant : fallbackRepos);
        } else {
          setAllRepos(fallbackRepos);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Using fallback data due to fetch error:', err);
        setAllRepos(fallbackRepos);
        setLoading(false);
      });
  }, []);

  // Extract unique languages for filters
  const filters = useMemo(() => {
    const langs = new Set<string>();
    allRepos.forEach(r => {
      if (r.language) langs.add(r.language);
    });
    return ['All', ...Array.from(langs).slice(0, 5)]; // Top 5 languages
  }, [allRepos]);

  // Filter and search repos
  const filteredRepos = useMemo(() => {
    return allRepos.filter(repo => {
      const matchesSearch = (repo.name + repo.description).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || repo.language === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [allRepos, searchQuery, activeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
  const currentRepos = filteredRepos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  return (
    <section id="projects" ref={containerRef} className="py-24 relative w-full perspective-1000">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          style={{ y: headerY }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-xl">Intelligent Work</h2>
          <p className="text-lg text-accent-dim max-w-2xl mx-auto text-shadow">
            A selection of projects exploring AI, data modeling, and robust software architecture.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Filters */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-brand text-white' 
                    : 'bg-surface/50 text-accent hover:bg-surface border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-dim" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand/50 transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
              <AnimatePresence mode='popLayout'>
                {currentRepos.map((repo) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={repo.id}
                  >
                    <SpotlightCard
                      className="group relative h-80 glass-panel rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-white/5 border-white/5 hover:border-white/10 flex flex-col"
                    >
                      {/* Hover Glow */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <div className="flex flex-col h-full relative z-10">
                        <div className="flex justify-between items-start mb-6 shrink-0">
                          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-brand/30 transition-colors">
                            <Code2 className="w-6 h-6 text-brand" />
                          </div>
                          <div className="flex gap-3">
                            <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-accent-dim hover:text-white transition-colors relative z-20">
                              <Github className="w-5 h-5" />
                            </a>
                            {repo.homepage && (
                              <a href={repo.homepage} target="_blank" rel="noreferrer" className="text-accent-dim hover:text-white transition-colors relative z-20">
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors shrink-0 truncate">
                          {repo.name}
                        </h3>
                        
                        {/* Scrollable Description */}
                        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar text-sm text-accent-dim mb-4 pointer-events-auto">
                          {repo.description || "No description provided."}
                        </div>
                        
                        {repo.language && (
                          <div className="flex items-center gap-2 shrink-0 mt-auto pt-2 border-t border-white/5">
                            <span className="w-2 h-2 rounded-full bg-data"></span>
                            <span className="text-sm font-mono text-accent-dim">{repo.language}</span>
                          </div>
                        )}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-white/10 bg-surface/50 text-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-mono text-accent-dim">
                  {currentPage} / {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-white/10 bg-surface/50 text-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
