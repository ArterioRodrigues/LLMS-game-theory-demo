'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Game Theory LLM Analysis</div>
        <div className="navbar-links">
          <Link href="/" className={`navbar-link ${pathname === '/' ? 'navbar-link-active' : ''}`}>
            Home
          </Link>
          <Link href="/results" className={`navbar-link ${pathname === '/results' ? 'navbar-link-active' : ''}`}>
            Results
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
