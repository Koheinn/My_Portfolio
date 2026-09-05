import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const nodes = [
  // Sources (Top layer)
  { id: 'api', label: 'REST/GraphQL APIs', x: 15, y: 10, type: 'source' },
  { id: 'stream_src', label: 'IoT & Web Streams', x: 50, y: 8, type: 'source' },
  { id: 'db_src', label: 'Relational & NoSQL DBs', x: 85, y: 10, type: 'source' },

  // Ingestion Layer
  { id: 'kafka', label: 'Apache Kafka / Kinesis (Real-time)', x: 30, y: 25, type: 'streaming' },
  { id: 'airflow', label: 'Apache Airflow (Batch ETL)', x: 70, y: 25, type: 'batch' },

  // Storage & Processing
  { id: 'datalake', label: 'S3 Data Lake', x: 15, y: 45, type: 'storage' },
  { id: 'spark', label: 'Apache Spark / EMR', x: 50, y: 45, type: 'processing' },
  { id: 'quality', label: 'Data Governance & DQ', x: 85, y: 45, type: 'processing' },

  // Serving Layer
  { id: 'warehouse', label: 'Cloud Data Warehouse (Redshift)', x: 30, y: 65, type: 'warehouse' },
  { id: 'feature_store', label: 'ML Feature Store', x: 70, y: 65, type: 'ml' },

  // AI & Applications
  { id: 'training', label: 'Model Training & MLOps', x: 15, y: 85, type: 'ml' },
  { id: 'llm', label: 'LLM & RAG Agents', x: 50, y: 88, type: 'ml' },
  { id: 'apps', label: 'Intelligent Applications', x: 85, y: 85, type: 'output' },
];

const edges = [
  { source: 'api', target: 'airflow' },
  { source: 'stream_src', target: 'kafka' },
  { source: 'db_src', target: 'airflow' },
  { source: 'db_src', target: 'kafka' },
  
  { source: 'kafka', target: 'datalake' },
  { source: 'kafka', target: 'spark' },
  
  { source: 'airflow', target: 'datalake' },
  { source: 'airflow', target: 'spark' },
  
  { source: 'datalake', target: 'spark' },
  { source: 'spark', target: 'quality' },
  
  { source: 'spark', target: 'warehouse' },
  { source: 'spark', target: 'feature_store' },
  { source: 'quality', target: 'warehouse' },
  
  { source: 'warehouse', target: 'training' },
  { source: 'warehouse', target: 'llm' },
  { source: 'feature_store', target: 'training' },
  { source: 'feature_store', target: 'llm' },
  
  { source: 'training', target: 'apps' },
  { source: 'llm', target: 'apps' },
];

export default function Ecosystem() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-24 relative w-full bg-surface/30 overflow-hidden perspective-1000">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-xl">Architecting for Scale</h2>
          <p className="text-lg text-accent-dim max-w-2xl mx-auto text-shadow">
            I design and implement resilient data architectures that seamlessly transform raw inputs into intelligent, business-critical applications. Hover to explore the flow.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-5xl mx-auto glass-panel rounded-3xl p-4 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-x-auto custom-scrollbar"
        >
          <div className="relative min-w-[900px] h-[550px] md:h-[650px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {edges.map((edge, idx) => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;
              
              const isActive = hoveredNode === edge.source || hoveredNode === edge.target;
              
              return (
                <line
                  key={idx}
                  x1={`${sourceNode.x}%`}
                  y1={`${sourceNode.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke={isActive ? '#3B82F6' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isActive ? 3 : 1.5}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer preserve-3d"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              initial={{ scale: 0, opacity: 0, z: -50 }}
              whileInView={{ scale: 1, opacity: 1, z: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <motion.div 
                whileHover={{ scale: 1.15, z: 30 }}
                className={`
                  px-4 py-2 rounded-full border backdrop-blur-md whitespace-nowrap font-medium text-sm transition-all duration-300 shadow-xl
                  ${hoveredNode === node.id 
                    ? 'bg-brand/20 border-brand text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]' 
                    : 'bg-surface/80 border-white/10 text-accent hover:border-white/30'}
                `}
              >
                {node.label}
              </motion.div>
            </motion.div>
          ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
