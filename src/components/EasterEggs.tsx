import React, { useState, useCallback, useEffect } from 'react';

const KonamiCode: React.FC = () => {
  const [showMissingNo, setShowMissingNo] = useState(false);
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const keySequence = React.useRef<string[]>([]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keySequence.current.push(e.key);
    keySequence.current.splice(-konamiSequence.length - 1, keySequence.current.length - konamiSequence.length);
    if (keySequence.current.join('') === konamiSequence.join('')) {
      setShowMissingNo(true);
      setTimeout(() => setShowMissingNo(false), 3000);
    }
  }, [konamiSequence]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return showMissingNo ? (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="text-white font-mono text-4xl animate-pulse">MissingNo. has appeared!</div>
    </div>
  ) : null;
};

export default KonamiCode;
