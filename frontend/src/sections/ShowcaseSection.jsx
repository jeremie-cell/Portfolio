import React from 'react'
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const RecordRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

   useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    const cards = [RecordRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={RecordRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/RecordList.PNG" alt="Record List" />
            </div>
            <div className="text-content">
              <h2>
                A simple Notion project called Record List
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with MongoDB, Express.js, React, and Node.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/spotify.png"
                  alt="Library Management Platform"
                />
              </div>
              <h2>Simple Project made with Figma</h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/letsgo.png" alt="Let's Go" />
              </div>
              <h2>Let's Go</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowcaseSection