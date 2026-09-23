"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const rx = useRef(0), ry = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dot.current)  { dot.current.style.left  = e.clientX + "px"; dot.current.style.top  = e.clientY + "px"; }
      rx.current = e.clientX; ry.current = e.clientY;
    };
    const onEnter = () => document.body.classList.add("on-hover");
    const onLeave = () => document.body.classList.remove("on-hover");

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    let raf: number;
    const follow = () => {
      if (ring.current) {
        const cur = { x: parseFloat(ring.current.style.left || "0"), y: parseFloat(ring.current.style.top || "0") };
        ring.current.style.left = cur.x + (rx.current - cur.x) * 0.12 + "px";
        ring.current.style.top  = cur.y + (ry.current - cur.y) * 0.12 + "px";
      }
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cur-dot"  ref={dot} />
      <div id="cur-ring" ref={ring} />
    </>
  );
}
