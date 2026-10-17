
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PageLoader.css";

const PageLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const numberRef = useRef(null);
  const progressRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const number = numberRef.current;
    const bar = progressRef.current;
    const track = trackRef.current;

    if (!loader || !number || !bar || !track) return;

    const counter = { value: 0 };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete,
      });

      timeline.to(counter, {
        value: 100,
        duration: reducedMotion ? 0.15 : 1.4,
        ease: "power2.out",
        onUpdate: () => {
          const value = Math.round(counter.value);

          number.textContent = String(value);
          bar.style.width = `${value}%`;
          track.setAttribute("aria-valuenow", String(value));
        },
      });

      timeline.to(loader, {
        opacity: 0,
        y: reducedMotion ? 0 : -20,
        duration: reducedMotion ? 0.1 : 0.45,
        ease: "power2.inOut",
      });
    }, loader);

    return () => context.revert();
  }, [onComplete]);

  return (
    <div className="page-loader" ref={loaderRef}>
      <div className="loader-background" />
      <div className="loader-overlay" />

      <div className="loader-stars" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            className="loader-star"
            style={{
              "--x": `${(i * 37 + 11) % 100}%`,
              "--y": `${(i * 61 + 7) % 100}%`,
              "--delay": `${(i % 9) * -0.7}s`,
              "--duration": `${3 + (i % 5)}s`,
              "--size": `${1 + (i % 3) * 0.5}px`,
            }}
          />
        ))}
      </div>

      <div className="loader-content">
        <div className="loader-number">
          <span ref={numberRef}>0</span>
          <span className="loader-percent">%</span>
        </div>

        <p className="loader-label">LOADING PORTFOLIO</p>

        <div
          className="loader-track"
          ref={trackRef}
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
        >
          <div className="loader-progress" ref={progressRef}>
            <span className="loader-glow" />
          </div>
        </div>

        <div className="loader-footer">
          <span>INITIALIZING</span>
          <span>V.01</span>
        </div>
      </div>

      <div className="loader-orb loader-orb-cyan" />
      <div className="loader-orb loader-orb-purple" />
    </div>
  );
};

export default PageLoader;
