import { useState, useEffect } from 'react';
import '../styles/fence-intro.css';

export default function FenceIntro({ onComplete }) {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Small delay then trigger open
    const t1 = setTimeout(() => setOpening(true), 800);
    const t2 = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (done) return null;

  return (
    <div className={`fence-intro ${opening ? 'fence-intro--opening' : ''}`}>
      {/* Background behind fence */}
      <div className="fence-bg">
        <div className="fence-bg-smoke fence-bg-smoke--1"></div>
        <div className="fence-bg-smoke fence-bg-smoke--2"></div>
        <div className="fence-bg-glow"></div>
        <div className="fence-bg-logo">
          <img src="/Logo.png" alt="Capital Caps" />
        </div>
        <div className="fence-bg-tag fence-bg-tag--1 font-marker">CAPITAL</div>
        <div className="fence-bg-tag fence-bg-tag--2 font-marker">CAPS</div>
        <div className="fence-bg-tag fence-bg-tag--3 font-heavy">EST. 2026</div>
      </div>

      {/* Left gate panel */}
      <div className="fence-panel fence-panel--left">
        <svg className="fence-svg" viewBox="0 0 300 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chainL" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Diamond chain links */}
              <path d="M20,2 L38,20 L20,38 L2,20 Z" fill="none" stroke="#888" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M20,6 L34,20 L20,34 L6,20 Z" fill="none" stroke="#aaa" strokeWidth="1" strokeLinejoin="round" opacity="0.5"/>
              {/* Knuckle joints */}
              <circle cx="20" cy="0" r="2.5" fill="#999" stroke="#fff" strokeWidth="0.5"/>
              <circle cx="0" cy="20" r="2.5" fill="#999" stroke="#fff" strokeWidth="0.5"/>
              <circle cx="40" cy="20" r="2.5" fill="#999" stroke="#fff" strokeWidth="0.5"/>
              <circle cx="20" cy="40" r="2.5" fill="#999" stroke="#fff" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="metalShineL" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#333"/>
              <stop offset="30%" stopColor="#666"/>
              <stop offset="50%" stopColor="#999"/>
              <stop offset="70%" stopColor="#555"/>
              <stop offset="100%" stopColor="#222"/>
            </linearGradient>
            <filter id="fenceGrunge">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
              <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended"/>
              <feComposite in="blended" in2="SourceGraphic" operator="in"/>
            </filter>
          </defs>
          <rect width="300" height="100" fill="url(#chainL)" opacity="0.95"/>
          {/* Metal frame bars */}
          <rect x="0" y="0" width="8" height="100" fill="url(#metalShineL)"/>
          <rect x="292" y="0" width="8" height="100" fill="url(#metalShineL)"/>
          <rect x="0" y="0" width="300" height="6" fill="url(#metalShineL)"/>
          <rect x="0" y="94" width="300" height="6" fill="url(#metalShineL)"/>
        </svg>
        {/* Rivet bolts */}
        <div className="fence-rivet fence-rivet--tl"></div>
        <div className="fence-rivet fence-rivet--bl"></div>
        <div className="fence-rivet fence-rivet--tr"></div>
        <div className="fence-rivet fence-rivet--br"></div>
      </div>

      {/* Right gate panel */}
      <div className="fence-panel fence-panel--right">
        <svg className="fence-svg" viewBox="0 0 300 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chainR" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,2 L38,20 L20,38 L2,20 Z" fill="none" stroke="#888" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M20,6 L34,20 L20,34 L6,20 Z" fill="none" stroke="#aaa" strokeWidth="1" strokeLinejoin="round" opacity="0.5"/>
              <circle cx="20" cy="0" r="2.5" fill="#999" stroke="#fff" strokeWidth="0.5"/>
              <circle cx="0" cy="20" r="2.5" fill="#999" stroke="#fff" strokeWidth="0.5"/>
              <circle cx="40" cy="20" r="2.5" fill="#999" stroke="#fff" strokeWidth="0.5"/>
              <circle cx="20" cy="40" r="2.5" fill="#999" stroke="#fff" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="metalShineR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#222"/>
              <stop offset="30%" stopColor="#555"/>
              <stop offset="50%" stopColor="#999"/>
              <stop offset="70%" stopColor="#666"/>
              <stop offset="100%" stopColor="#333"/>
            </linearGradient>
          </defs>
          <rect width="300" height="100" fill="url(#chainR)" opacity="0.95"/>
          <rect x="0" y="0" width="8" height="100" fill="url(#metalShineR)"/>
          <rect x="292" y="0" width="8" height="100" fill="url(#metalShineR)"/>
          <rect x="0" y="0" width="300" height="6" fill="url(#metalShineR)"/>
          <rect x="0" y="94" width="300" height="6" fill="url(#metalShineR)"/>
        </svg>
        <div className="fence-rivet fence-rivet--tl"></div>
        <div className="fence-rivet fence-rivet--bl"></div>
        <div className="fence-rivet fence-rivet--tr"></div>
        <div className="fence-rivet fence-rivet--br"></div>
      </div>

      {/* Center locking bar */}
      <div className={`fence-lock-bar ${opening ? 'fence-lock-bar--open' : ''}`}>
        <div className="fence-chain">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#aaa', display: 'block' }}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </div>
      </div>

      {/* ENTER prompt */}
      <div className={`fence-enter-hint ${opening ? 'fence-enter-hint--hide' : ''}`}>
        <span className="font-heavy">CAPITAL CAPS</span>
        <span className="font-marker">entrando a la zona exclusiva...</span>
      </div>
    </div>
  );
}
