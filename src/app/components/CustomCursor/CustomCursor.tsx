'use client';

import { useEffect, useState, useRef } from 'react';

const CustomCursors = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const outerCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const follow = () => {
      if (outerRef.current && innerRef.current) {
        // Smooth follow for outer cursor
        outerCoords.current.x += (coords.x - outerCoords.current.x) * 0.1;
        outerCoords.current.y += (coords.y - outerCoords.current.y) * 0.1;

        outerRef.current.style.transform = `translate3d(${outerCoords.current.x}px, ${outerCoords.current.y}px, 0)`;

        // Instant follow for inner cursor
        innerRef.current.style.transform = `translate3d(${coords.x}px, ${coords.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(follow);
    };

    follow();
    return () => cancelAnimationFrame(requestRef.current);
  }, [coords]);

  return (
    <>
      {/* Outer ring with lag */}
      <div
        ref={outerRef}
        className="fixed top-[-10] left-[-10] z-[99] pointer-events-none w-8 h-8 rounded-full border-2 border-[#9b7bbd] transition-transform duration-150 ease-out"
      />
      
      {/* Inner dot (follows instantly) */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 z-[99] pointer-events-none w-3 h-3 rounded-full bg-[#9b7bbd] transition-transform duration-75 ease-out"
      />
    </>
  );
};

export default CustomCursors;
