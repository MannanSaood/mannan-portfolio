import React, { useEffect, useRef, useState } from 'react';

export const AnimationStyles = () => (
  <style>{`
    @keyframes ember-float {
      0% { transform: translateY(0) scale(1); opacity: 0.7; }
      100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
    }
    .animate-ember { animation-name: ember-float; animation-timing-function: linear; animation-iteration-count: infinite; }
    
    @keyframes mist-drift {
      0% { transform: translateX(-100%) translateY(0%) rotate(0deg) scale(1); opacity: 0; }
      20% { opacity: 0.6; }
      80% { opacity: 0.6; }
      100% { transform: translateX(100%) translateY(0%) rotate(0deg) scale(1.2); opacity: 0; }
    }
    .animate-mist { position: absolute; width: 200%; height: 100%; background: radial-gradient(circle, rgba(173, 161, 221, 0.15) 0%, rgba(173, 161, 221, 0) 60%); animation-name: mist-drift; animation-timing-function: linear; animation-iteration-count: infinite; }

    @keyframes twinkle {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.8; }
    }
    .animate-twinkle { animation-name: twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }

    .connect-card {
        position: relative;
        background-color: transparent;
        border: 1px solid transparent;
        background-clip: padding-box;
    }
    .connect-card::before {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        z-index: -1;
        margin: -1px;
        border-radius: inherit;
        background: linear-gradient(120deg, var(--gradient-from, #FDBA74), var(--gradient-to, #F4812F));
        opacity: 0.5;
        transition: opacity 0.3s ease-in-out;
    }
    .connect-card:hover::before {
        opacity: 1;
    }
    .dark .connect-card::before {
        background: linear-gradient(120deg, var(--gradient-from, #A78BFA), var(--gradient-to, #F472B6));
    }
  `}</style>
);

export const EmberBackground = () => (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden transition-transform duration-300 ease-out">
        {/* Ember particles */}
        {[...Array(100)].map((_, i) => (
            <div key={i} className="absolute bottom-0 w-1 h-1 bg-orange-400 rounded-full animate-ember" style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 8 + 7}s`,
                animationDelay: `${Math.random() * 10}s`,
            }}></div>
        ))}
        {/* Ember-colored mist overlay - multiple layers for better coverage */}
        <div
            className="animate-mist"
            style={{
                animationDuration: '45s',
                animationDelay: '0s',
                background: 'radial-gradient(circle, rgba(253,186,116,0.1) 0%, rgba(244,129,47,0.30) 40%, rgba(244,129,47,0) 70%)',
            }}
        ></div>
        <div
            className="animate-mist"
            style={{
                animationDuration: '55s',
                animationDelay: '-15s',
                background: 'radial-gradient(circle, rgba(244,129,47,0.05) 0%, rgba(253,186,116,0.2) 40%, rgba(244,129,47,0) 70%)',
            }}
        ></div>
        <div
            className="animate-mist"
            style={{
                animationDuration: '65s',
                animationDelay: '-30s',
                background: 'radial-gradient(circle, rgba(253,186,116,0.05) 0%, rgba(244,129,47,0.1) 40%, rgba(244,129,47,0) 70%)',
            }}
        ></div>
        <div
            className="animate-mist"
            style={{
                animationDuration: '50s',
                animationDelay: '-25s',
                background: 'radial-gradient(circle, rgba(244,129,47,0.05) 0%, rgba(253,186,116,0.05) 40%, rgba(244,129,47,0) 70%)',
            }}
        ></div>
        {/* Additional mist layers for bottom-left coverage */}
        <div
            className="animate-mist"
            style={{
                animationDuration: '60s',
                animationDelay: '-40s',
                background: 'radial-gradient(circle, rgba(253,186,116,0.06) 0%, rgba(244,129,47,0.02) 40%, rgba(244,129,47,0) 70%)',
            }}
        ></div>
        <div
            className="animate-mist"
            style={{
                animationDuration: '70s',
                animationDelay: '-50s',
                background: 'radial-gradient(circle, rgba(244,129,47,0.05) 0%, rgba(253,186,116,0.01) 40%, rgba(244,129,47,0) 70%)',
            }}
        ></div>
    </div>
);

export const MistBackground = () => (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden transition-transform duration-300 ease-out">
        {[...Array(150)].map((_, i) => (
            <div key={i} className="absolute w-0.5 h-0.5 bg-lavender-light rounded-full animate-twinkle" style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 3}s`,
            }}></div>
        ))}
        <div className="animate-mist" style={{ animationDuration: '45s', animationDelay: '0s' }}></div>
        <div className="animate-mist" style={{ animationDuration: '55s', animationDelay: '-15s' }}></div>
        <div className="animate-mist" style={{ animationDuration: '65s', animationDelay: '-30s' }}></div>
        <div className="animate-mist" style={{ animationDuration: '50s', animationDelay: '-25s' }}></div>
        {/* Additional mist layers for comprehensive coverage */}
        <div className="animate-mist" style={{ animationDuration: '60s', animationDelay: '-40s' }}></div>
        <div className="animate-mist" style={{ animationDuration: '70s', animationDelay: '-50s' }}></div>
    </div>
);

interface VineScrollProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  trigger: boolean;
  onComplete?: () => void;
}

export const VineScroll: React.FC<VineScrollProps> = ({ start, end, trigger, onComplete }) => {
  const [show, setShow] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      if (pathRef.current) {
        pathRef.current.style.strokeDasharray = pathRef.current.getTotalLength().toString();
        pathRef.current.style.strokeDashoffset = pathRef.current.getTotalLength().toString();
        setTimeout(() => {
          if (pathRef.current) {
            pathRef.current.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4,1.4,0.6,1)';
            pathRef.current.style.strokeDashoffset = '0';
          }
        }, 10);
        setTimeout(() => {
          setShow(false);
          if (onComplete) onComplete();
        }, 900);
      }
    }
  }, [trigger, onComplete]);

  if (!show) return null;

  // Simple quadratic curve for vine
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 80; // curve up
  const path = `M${start.x},${start.y} Q${midX},${midY} ${end.x},${end.y}`;

  return (
    <svg style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 9999 }} width={window.innerWidth} height={window.innerHeight}>
      <path
        ref={pathRef}
        d={path}
        stroke="#38A169"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
        filter="drop-shadow(0 2px 6px #38A16988)"
      />
      {/* Optionally add a leaf at the end */}
      <circle cx={end.x} cy={end.y} r={10} fill="#38A169" filter="drop-shadow(0 2px 6px #38A16988)" />
    </svg>
  );
};
