'use client';

import { useEffect } from 'react';

/**
 * Глобальные появления при прокрутке: элементы с классом .reveal
 * получают .in, когда попадают в зону видимости.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    const observeAll = () =>
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    observeAll();
    // элементы, добавленные при навигации между страницами
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
