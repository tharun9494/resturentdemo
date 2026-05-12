import React, { useEffect, useRef } from "react";

/**
 * Custom gold cursor with smooth follow. Auto-disabled on touch devices.
 */
export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const onHover = (e) => {
      const target = e.target.closest("a, button, [data-cursor='hover']");
      if (target) ring.classList.add("cursor-hover");
      else ring.classList.remove("cursor-hover");
    };

    let raf;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    document.body.classList.add("cursor-none");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onHover);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHover);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" data-testid="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" data-testid="custom-cursor-dot" />
    </>
  );
};

export default CustomCursor;
