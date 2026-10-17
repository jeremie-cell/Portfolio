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

  // Anime.js line animation for the title and subtitle
  useEffect(() => {
    if (!sectionRef.current) return

    const elements = sectionRef.current.querySelectorAll(
      '.experience-heading, .experience-subtitle'
    )

    const splits = []

    elements.forEach((element) => {
      const split = splitText(element, {
        lines: {
          wrap: 'clip',
        },
      })

      splits.push({ element, split })
    })

    const hideLines = (split) => {
      split.lines.forEach((line) => {
        line.style.opacity = '0'
        line.style.transform = 'translateY(100%)'
      })
    }

    splits.forEach(({ split }) => hideLines(split))

    const observers = splits.map(({ element, split }, index) => {
      let animation = null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (animation) animation.pause()

            hideLines(split)

            animation = animate(split.lines, {
              y: ['100%', '0%'],
              opacity: [0, 1],
              duration: 750,
              delay: stagger(120, {
                start: index * 150,
              }),
              ease: 'out(3)',
            })
          } else {
            if (animation) {
              animation.pause()
              animation = null
            }

            hideLines(split)
          }
        },
        {
          threshold: 0.1,
        }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
      splits.forEach(({ split }) => split.revert())
    }
  }, [])

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