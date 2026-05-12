import React, { useEffect, useRef } from "react";

/**
 * Lightweight canvas-based "3D" gold particle field.
 * Renders depth-sorted dots with parallax to give a cinematic 3D feel
 * without the cost of Three.js. Reacts to mouse for subtle motion.
 */
export const ParticleCanvas = ({ density = 110, color = "212,175,55" }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 1 + 0.2, // depth 0.2 - 1.2
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.6 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left - w / 2) / w;
      mouseRef.current.y = (e.clientY - rect.top - h / 2) / h;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    const tick = (t) => {
      ctx.clearRect(0, 0, w, h);
      // soft vignette glow center
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
      grad.addColorStop(0, `rgba(${color},0.07)`);
      grad.addColorStop(1, "rgba(5,5,5,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        p.x += p.vx + mx * p.z * 0.6;
        p.y += p.vy + my * p.z * 0.6;
        p.twinkle += 0.02;

        // wrap
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        const size = p.r * p.z * 1.4;
        const alpha = (0.25 + Math.sin(p.twinkle) * 0.25) * p.z;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.shadowColor = `rgba(${color},${alpha * 0.9})`;
        ctx.shadowBlur = 8 * p.z;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [density, color]);

  return <canvas ref={canvasRef} className="particle-canvas" data-testid="particle-canvas" />;
};

export default ParticleCanvas;
