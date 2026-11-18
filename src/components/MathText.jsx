import React, { useEffect, useRef } from 'react';
import katex from 'katex';

/**
 * Renders text containing LaTeX math formulas:
 * - Inline formulas delimited by $...$
 * - Display / block formulas delimited by $$...$$
 * - Plain markdown breaks / bold text
 */
export const MathText = ({ text, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !text) return;

    // Tokenize text into math blocks and non-math segments
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    const parts = text.split(regex);

    containerRef.current.innerHTML = '';

    parts.forEach((part) => {
      if (!part) return;

      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        const span = document.createElement('div');
        span.className = 'my-2 overflow-x-auto text-center py-1 text-primary-600 dark:text-primary-400 font-medium';
        try {
          katex.render(math, span, { displayMode: true, throwOnError: false });
        } catch (e) {
          span.textContent = part;
        }
        containerRef.current.appendChild(span);
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1).trim();
        const span = document.createElement('span');
        span.className = 'inline-block mx-0.5 font-medium';
        try {
          katex.render(math, span, { displayMode: false, throwOnError: false });
        } catch (e) {
          span.textContent = part;
        }
        containerRef.current.appendChild(span);
      } else {
        // Plain text: format bolding and line breaks
        const span = document.createElement('span');
        // Handle markdown-style bold **text**
        const formatted = part
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br/>');
        span.innerHTML = formatted;
        containerRef.current.appendChild(span);
      }
    });
  }, [text]);

  return <div ref={containerRef} className={`leading-relaxed ${className}`} />;
};
