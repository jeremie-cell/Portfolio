import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate, splitText, stagger } from 'animejs'

import TitleHeader from '../components/TitleHeader'
import { techStackIcons } from '../constants'
import TechIcon from '../components/models/TechLogos/TechIcon'

gsap.registerPlugin(ScrollTrigger)

const TechStack = () => {
  const sectionRef = useRef(null)

  // Existing GSAP animation for tech cards
  useGSAP(() => {
    gsap.fromTo(
      '.tech-card',
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '#skills',
          start: 'top center',
        },
      }
    )
  }, { scope: sectionRef })


useEffect(() => {
  if (!sectionRef.current) return;

  const elements = sectionRef.current.querySelectorAll(
    ".experience-heading, .experience-subtitle"
  );

  const splits = [];
  const animations = [];

  elements.forEach((element) => {
    const split = splitText(element, {
      lines: {
        wrap: "clip",
      },
    });

    splits.push(split);

    split.lines.forEach((line) => {
      line.style.opacity = "0";
      line.style.transform = "translateY(100%)";
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const index = Array.from(elements).indexOf(entry.target);
        const split = splits[index];

        if (!split) return;

        const animation = animate(split.lines, {
          y: ["100%", "0%"],
          opacity: [0, 1],
          duration: 650,
          delay: stagger(100),
          ease: "out(3)",
        });

        animations.push(animation);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => observer.observe(element));

  return () => {
    observer.disconnect();

    animations.forEach((animation) => animation.pause());
    splits.forEach((split) => split.revert());
  };
}, []);


  return (
    <section
      id="skills"
      ref={sectionRef}
      className="flex-center section-padding"
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Tech Stacks I used"
          sub="🤝 What I Bring to the Table"
        />

        <div className="tech-grid">
          {techStackIcons.map((techStackIcon) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />

              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIcon model={techStackIcon} />
                </div>

                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack