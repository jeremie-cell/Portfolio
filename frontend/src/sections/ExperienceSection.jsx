import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate, splitText, stagger } from 'animejs'

import { expCards } from '../constants'
import TitleHeader from '../components/TitleHeader.jsx'
import GlowCard from '../components/GlowCard.jsx'

gsap.registerPlugin(ScrollTrigger)

const ExperienceSection = () => {
  const sectionRef = useRef(null)

  // Existing GSAP animations
  useGSAP(() => {
    gsap.utils.toArray('.timeline-card').forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: 'left left',
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
      })
    })

    gsap.to('.timeline', {
      transformOrigin: 'bottom bottom',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top center',
        end: '70% center',
        onUpdate: (self) => {
          gsap.to('.timeline', {
            scaleY: 1 - self.progress,
          })
        },
      },
    })

    gsap.utils.toArray('.expText').forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        xPercent: 0,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: text,
          start: 'top 60%',
        },
      })
    })
  }, [])

  // Anime.js line animation for section heading and experience titles
  useEffect(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current

    const animatedElements = section.querySelectorAll(
      '.experience-heading, .experience-subtitle, .exp-title'
    )

    const splits = []

    animatedElements.forEach((element) => {
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

    const observers = splits.map(({ element, split }) => {
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
              delay: stagger(120),
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
        { threshold: 0.1 }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
      splits.forEach(({ split }) => split.revert())
    }
  }, [])

  // Anime.js word animation for responsibilities
  useEffect(() => {
    if (!sectionRef.current) return

    const responsibilityItems = sectionRef.current.querySelectorAll(
      '.responsibility-text'
    )

    const splits = []

    responsibilityItems.forEach((item) => {
      const split = splitText(item, {
        words: {
          wrap: 'clip',
        },
      })

      splits.push({ item, split })
    })

    const hideWords = (split) => {
      split.words.forEach((word) => {
        word.style.opacity = '0'
        word.style.transform = 'translateY(100%)'
      })
    }

    splits.forEach(({ split }) => hideWords(split))

    const observers = splits.map(({ item, split }) => {
      let animation = null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (animation) animation.pause()

            hideWords(split)

            animation = animate(split.words, {
              y: ['100%', '0%'],
              opacity: [0, 1],
              duration: 500,
              delay: stagger(30),
              ease: 'out(3)',
            })
          } else {
            if (animation) {
              animation.pause()
              animation = null
            }

            hideWords(split)
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(item)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
      splits.forEach(({ split }) => split.revert())
    }
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="My experience as a Student"
          sub="💼 My Experience Overview"
        />

        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-2/6">
                  <GlowCard card={card}>
                    <div>
                      <img src={card.imgPath} alt={card.title} />
                    </div>
                  </GlowCard>
                </div>

                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>

                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <img
                          src={card.logoPath}
                          alt={`${card.title} logo`}
                        />
                      </div>

                      <div>
                        <h1 className="exp-title font-semibold text-3xl">
                          {card.title}
                        </h1>

                        <p className="my-5 text-white-50">
                          🗓️&nbsp;{card.date}
                        </p>

                        <p className="text-[#839CB5] italic">
                          Responsibilities
                        </p>

                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map(
                            (responsibility, index) => (
                              <li
                                key={index}
                                className="responsibility-text text-lg"
                              >
                                {responsibility}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection