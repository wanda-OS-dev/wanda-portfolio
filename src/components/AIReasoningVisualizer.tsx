'use client';

import { motion } from 'framer-motion';

const nodeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      staggerChildren: 0.1,
    }
  },
};

const mockData = {
  nodes: [
    { id: 'start', label: 'User Query', x: 50, y: 200 },
    { id: 'parse', label: 'Parse Intent', x: 250, y: 200 },
    { id: 'tool', label: 'Select Tool: gh', x: 450, y: 100 },
    { id: 'api', label: 'Call API', x: 650, y: 100 },
    { id: 'output', label: 'Format Output', x: 450, y: 300 },
    { id: 'end', label: 'Display to User', x: 650, y: 300 },
  ],
  edges: [
    { from: 'start', to: 'parse' },
    { from: 'parse', to: 'tool' },
    { from: 'parse', to: 'output' },
    { from: 'tool', to: 'api' },
    { from: 'api', to: 'output' },
    { from: 'output', to: 'end' },
  ],
};

export function AIReasoningVisualizer() {
  return (
    <div className="p-8 border border-white/10 rounded-lg bg-black/20">
      <h3 className="text-lg font-semibold text-brand-gold mb-4">Wanda's Thought Process</h3>
      <svg viewBox="0 0 800 400" className="w-full h-auto">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#444" />
          </marker>
        </defs>

        {/* Edges */}
        {mockData.edges.map(edge => {
          const fromNode = mockData.nodes.find(n => n.id === edge.from);
          const toNode = mockData.nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;
          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#444"
              strokeWidth="1"
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          )
        })}

        {/* Nodes */}
        {mockData.nodes.map((node, i) => (
          <motion.g key={node.id} variants={nodeVariants} initial="initial" animate="animate">
            <circle cx={node.x} cy={node.y} r="10" fill="#c9a84c" />
            <text x={node.x} y={node.y - 15} textAnchor="middle" fontSize="12" fill="#eee">
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
