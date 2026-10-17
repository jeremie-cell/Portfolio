import React, { useEffect, useRef } from 'react'
import { abilities } from '../constants'
import { animate, stagger, splitText } from 'animejs'

const FeatureCards = () => {
  const cardsRef = useRef(null)

  useEffect(() => {
    if (!cardsRef.current) return

    // Select both titles and descriptions
    const textElements = cardsRef.current.querySelectorAll(
      '.feature-title, .feature-desc'
    )

    const splits = []

    // Split titles and descriptions into lines
    textElements.forEach((element) => {
      const split = splitText(element, {
        lines: {
          wrap: 'clip',
        },
      })

      splits.push(split)
    })

    const hideLines = () => {
      splits.forEach((split) => {
        split.lines.forEach((line) => {
          line.style.opacity = '0'
          line.style.transform = 'translateY(100%)'
        })
      })
    }

    // Initially hide all lines
    hideLines()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate titles and descriptions in sequence
            splits.forEach((split, index) => {
              animate(split.lines, {
                y: ['100%', '0%'],
                opacity: [0, 1],
                duration: 750,
                delay: stagger(120, {
                  start: index * 100,
                }),
                ease: 'out(3)',
              })
            })
          } else {
            // Reset text when the cards leave the viewport
            hideLines()
          }
        })
      },
      {
        threshold: 0.1,
      }
    )

    observer.observe(cardsRef.current)

    return () => {
      observer.disconnect()
      splits.forEach((split) => split.revert())
    }
  }, [])

  return (
    <div className="w-full padding-x-lg">
      <div ref={cardsRef} className="mx-auto grid-3-cols">
        {abilities.map(({ imgPath, title, desc }) => (
          <div
            key={title}
            className="card-border rounded-xl p-8 flex flex-col gap-4"
          >
            <div className="size-14 flex items-center justify-center rounded-full">
              <img src={imgPath} alt={title} />
            </div>

            <h3 className="feature-title text-white text-2xl font-semibold mt-2">
              {title}
            </h3>

            <p className="feature-desc text-white-50 text-lg">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureCards