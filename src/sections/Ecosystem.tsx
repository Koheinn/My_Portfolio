import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const nodes = [
  { id: 'data', label: 'Raw Data', x: 50, y: 10, type: 'core' },
  { id: 'ingestion', label: 'AWS Data Pipeline', x: 50, y: 25, type: 'cloud' },
  { id: 'storage', label: 'Data Lake / S3', x: 25, y: 45, type: 'storage' },
  { id: 'processing', label: 'Apache Spark / EMR', x: 75, y: 45, type: 'processing' },
  { id: 'warehouse', label: 'Data Warehouse', x: 50, y: 60, type: 'core' },
  { id: 'ml', label: 'Machine Learning Models', x: 50, y: 75, type: 'ml' },
  { id: 'apps', label: 'Intelligent Applications', x: 50, y: 90, type: 'output' },
];

const edges = [
  { source: 'data', target: 'ingestion' },
  { source: 'ingestion', target: 'storage' },
  { source: 'ingestion', target: 'processing' },
  { source: 'storage', target: 'processing' },
  { source: 'processing', target: 'warehouse' },
  { source: 'warehouse', target: 'ml' },
  { source: 'ml', target: 'apps' },
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
          style={{ opacity, y: useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]) }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-xl">Cloud-Native Data Flow</h2>
          <p className="text-lg text-accent-dim max-w-2xl mx-auto text-shadow">
            Hover to explore the architecture of a scalable, cloud-based data engineering pipeline.
          </p>
        </motion.div>

        <motion.div 
          style={{ scale, rotateX, opacity }}
          className="relative w-full max-w-4xl mx-auto glass-panel rounded-3xl p-4 md:p-8 preserve-3d shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-x-auto custom-scrollbar"
        >
          <div className="relative min-w-[700px] h-[500px] md:h-[600px]">
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
