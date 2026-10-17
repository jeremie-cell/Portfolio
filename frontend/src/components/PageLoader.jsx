
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PageLoader.css";

const PageLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const numberRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const counter = { value: 0 };

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          y: -25,
          duration: 0.65,
          ease: "power3.inOut",
          onComplete,
        });
      },
    });

    timeline.to(counter, {
      value: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => {
        const value = Math.round(counter.value);

        if (numberRef.current) {
          numberRef.current.textContent = `${value}`;
        }

        if (progressRef.current) {
          progressRef.current.style.width = `${value}%`;
        }

        setProgress(value);
      },
    });

    return () => timeline.kill();
  }, [onComplete]);

  return (
    <div className="page-loader" ref={loaderRef}>
      {/* Background layers */}
      <div className="loader-background" />
      <div className="loader-overlay" />

      {/* Animated star particles */}
      <div className="loader-stars" aria-hidden="true">
        {Array.from({ length: 55 }, (_, i) => (
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

      {/* Loader content stays in front */}
      <div className="loader-content">
        <div className="loader-number">
          <span ref={numberRef}>0</span>
          <span className="loader-percent">%</span>
        </div>

        <p className="loader-label">LOADING PORTFOLIO</p>

        <div
          className="loader-track"
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
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

      {/* Decorative ambient lighting */}
      <div className="loader-orb loader-orb-cyan" />
      <div className="loader-orb loader-orb-purple" />
    </div>
  );
};

export default PageLoader;
