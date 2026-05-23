import { useState, useEffect } from 'react';

/**
 * Cycles through an array of strings with a typewriter effect.
 * @param {string[]} words - Array of words to cycle through
 * @param {number} typeSpeed - Ms per character typed (default 80)
 * @param {number} deleteSpeed - Ms per character deleted (default 50)
 * @param {number} pauseMs - Ms to pause at full word (default 1800)
 */
export function useTypewriter(words, typeSpeed = 80, deleteSpeed = 50, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseMs);
      return () => clearTimeout(t);
    }

    if (isDeleting) {
      if (displayed.length === 0) {
        setIsDeleting(false);
        setWordIndex(i => i + 1);
        return;
      }
      const t = setTimeout(() => {
        setDisplayed(d => d.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(t);
    }

    if (displayed.length === currentWord.length) {
      setIsPaused(true);
      return;
    }

    const t = setTimeout(() => {
      setDisplayed(currentWord.slice(0, displayed.length + 1));
    }, typeSpeed);
    return () => clearTimeout(t);
  }, [displayed, wordIndex, isDeleting, isPaused, words, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}
