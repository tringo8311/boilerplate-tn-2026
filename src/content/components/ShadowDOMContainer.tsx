import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ShadowDOMContainerProps {
  children: React.ReactNode;
  cssPaths?: string[];
}

export const ShadowDOMContainer: React.FC<ShadowDOMContainerProps> = ({ children, cssPaths = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    if (containerRef.current && !shadowRoot) {
      const root = containerRef.current.attachShadow({ mode: 'open' });
      setShadowRoot(root);
    }
  }, [shadowRoot]);

  useEffect(() => {
    if (shadowRoot) {
      cssPaths.forEach((path) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = chrome.runtime.getURL(path);
        shadowRoot.appendChild(link);
      });
    }
  }, [shadowRoot, cssPaths]);

  return (
    <div ref={containerRef}>
      {shadowRoot && createPortal(children, shadowRoot)}
    </div>
  );
};
