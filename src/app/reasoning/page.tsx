'use client';
import { AIReasoningVisualizer } from '@/components/AIReasoningVisualizer';

export default function ReasoningPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Reasoning Visualization</h1>
      <AIReasoningVisualizer />
    </main>
  );
}
