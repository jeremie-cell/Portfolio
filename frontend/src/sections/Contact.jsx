import React, { useRef, useState, useEffect } from 'react'
import { animate, splitText, stagger } from 'animejs'

import TitleHeader from '../components/TitleHeader'
import ContactExperience from '../components/ContactExperience'

const Contact = () => {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  // Anime.js line animation for the title and subtitle only
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )

      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="flex-center section-padding"
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? 'Sending...' : 'Send Message'}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>

          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact