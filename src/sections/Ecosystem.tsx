import { useState } from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 'data', label: 'DATA', x: 50, y: 10, type: 'core' },
  { id: 'python', label: 'Python', x: 50, y: 25, type: 'lang' },
  { id: 'pandas', label: 'NumPy / Pandas', x: 30, y: 40, type: 'lib' },
  { id: 'viz', label: 'Visualization', x: 70, y: 40, type: 'lib' },
  { id: 'ml', label: 'Machine Learning', x: 50, y: 60, type: 'core' },
  { id: 'ai', label: 'AI', x: 50, y: 75, type: 'core' },
  { id: 'apps', label: 'Applications', x: 50, y: 90, type: 'output' },
];

const edges = [
  { source: 'data', target: 'python' },
  { source: 'python', target: 'pandas' },
  { source: 'python', target: 'viz' },
  { source: 'pandas', target: 'ml' },
  { source: 'viz', target: 'ml' },
  { source: 'ml', target: 'ai' },
  { source: 'ai', target: 'apps' },
];

export default function Ecosystem() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section className="py-24 relative w-full bg-surface/30 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 md:text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">My Technology Ecosystem</h2>
          <p className="text-lg text-accent-dim max-w-2xl mx-auto">
            Hover to explore how data flows through tools, models, and into intelligent applications.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto h-[600px] glass-panel rounded-3xl p-4 md:p-8">
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
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <div 
                className={`
                  px-4 py-2 rounded-full border backdrop-blur-md whitespace-nowrap font-medium text-sm transition-all duration-300
                  ${hoveredNode === node.id 
                    ? 'bg-brand/20 border-brand text-white scale-110 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                    : 'bg-surface/80 border-white/10 text-accent hover:border-white/30'}
                `}
              >
                {node.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
