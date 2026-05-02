import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Analysis() {
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Analysis</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-white tracking-tight">Analysis</h1>
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
        <p className="text-gray-400">Your link analytics and metrics will appear here.</p>
      </div>
    </div>
  );
}
