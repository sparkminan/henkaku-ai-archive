import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan-100 mb-4">404</h1>
        <p className="text-xl text-cyan-400 mb-8">Page not found</p>
        <Link href="/" className="btn-cyber-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;