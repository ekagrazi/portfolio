import { useEffect, useRef, useState } from 'react';

// ── Scroll intensity tracker ───────────────────────────────────────────────
function useScrollIntensity() {
  const [intensity, setIntensity] = useState(0.3);
  const lastScrollY = useRef(0);
  const lastTime    = useRef(Date.now());
  const frameRef    = useRef(null);

  useEffect(() => {
    let currentIntensity = 0.3;

    const onScroll = () => {
      const now      = Date.now();
      const dt       = Math.max(now - lastTime.current, 1);
      const dy       = Math.abs(window.scrollY - lastScrollY.current);
      const velocity = dy / dt; // px per ms

      // Map velocity to intensity: slow=0.2, fast=1.0
      const target = Math.min(0.2 + velocity * 8, 1.0);

      lastScrollY.current = window.scrollY;
      lastTime.current    = now;

      // Ease toward target
      currentIntensity = currentIntensity + (target - currentIntensity) * 0.3;
      setIntensity(currentIntensity);
    };

    // Decay intensity when not scrolling
    const decay = setInterval(() => {
      currentIntensity = currentIntensity + (0.2 - currentIntensity) * 0.05;
      setIntensity(currentIntensity);
    }, 50);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(decay);
    };
  }, []);

  return intensity;
}

// ── Canvas shooting stars ─────────────────────────────────────────────────
export default function ShootingStars() {
  const canvasRef = useRef(null);
  const intensity = useScrollIntensity();
  const starsRef  = useRef([]);
  const frameRef  = useRef(null);
  const intensityRef = useRef(intensity);

  // Keep intensityRef in sync without re-running the animation loop
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize canvas to window
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Star class
    class Star {
      constructor() { this.reset(); }

      reset() {
        // Start from random position along top/right edges
        const edge = Math.random();
        if (edge < 0.6) {
          // From top
          this.x = Math.random() * canvas.width;
          this.y = -20;
        } else {
          // From right
          this.x = canvas.width + 20;
          this.y = Math.random() * canvas.height * 0.5;
        }

        this.length    = 80 + Math.random() * 140;
        this.speed     = 4 + Math.random() * 6;
        this.opacity   = 0;
        this.maxOpacity = 0.15 + Math.random() * 0.35;
        this.width     = 0.5 + Math.random() * 1;
        this.angle     = Math.PI / 4 + (Math.random() - 0.5) * 0.4; // ~45° ± 23°
        this.vx        = Math.cos(this.angle) * this.speed;
        this.vy        = Math.sin(this.angle) * this.speed;
        this.progress  = 0; // 0→1 lifecycle
        this.alive     = true;
      }

      update() {
        this.x        += this.vx;
        this.y        += this.vy;
        this.progress += 0.012;

        // Fade in for first 20%, full for middle, fade out last 20%
        if (this.progress < 0.2) {
          this.opacity = (this.progress / 0.2) * this.maxOpacity;
        } else if (this.progress > 0.8) {
          this.opacity = ((1 - this.progress) / 0.2) * this.maxOpacity;
        } else {
          this.opacity = this.maxOpacity;
        }

        if (this.progress >= 1) this.alive = false;
      }

      draw() {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth   = this.width;
        ctx.lineCap     = 'round';

        // Gradient along the tail
        const grad = ctx.createLinearGradient(
          this.x, this.y,
          this.x - this.vx * this.length / this.speed,
          this.y - this.vy * this.length / this.speed
        );
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - this.vx * this.length / this.speed,
          this.y - this.vy * this.length / this.speed
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    // Spawn rate based on intensity
    let spawnTimer = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const int = intensityRef.current;

      // Spawn new stars based on intensity
      spawnTimer += int;
      if (spawnTimer >= 1) {
        spawnTimer = 0;
        // More stars at higher intensity
        const count = Math.floor(int * 2);
        for (let i = 0; i < count; i++) {
          if (starsRef.current.length < 60) { // max cap
            starsRef.current.push(new Star());
          }
        }
      }

      // Update + draw all stars
      starsRef.current = starsRef.current.filter(s => s.alive);
      starsRef.current.forEach(s => { s.update(); s.draw(); });
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
