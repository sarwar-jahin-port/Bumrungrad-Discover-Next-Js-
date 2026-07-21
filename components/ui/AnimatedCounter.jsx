"use client";

import React, { useEffect, useRef, useState } from "react";

// Accepts a free-text admin-supplied string like "10,000+ Cases Managed" and,
// when it starts with a number, animates counting up to that number on
// scroll-into-view while preserving the original prefix/suffix formatting
// (commas, "+", trailing label). Falls back to rendering the raw text
// statically if no leading number is found.
const AnimatedCounter = ({ text, className = "", duration = 1500 }) => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [value, setValue] = useState(0);

  const match = typeof text === "string" ? text.match(/^([\d,]+)(.*)$/) : null;
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!target || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!started || !target) return;
    const startTime = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target, duration]);

  if (!text) return null;

  return (
    <span ref={ref} className={className}>
      {target ? `${value.toLocaleString()}${suffix}` : text}
    </span>
  );
};

export default AnimatedCounter;
