import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading words animation
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        gsap.fromTo(
          words,
          { y: '110%' },
          {
            y: '0%',
            stagger: 0.025,
            duration: 1.0,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        )
      }

      // Content fade in
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = 'Начните свою историю здесь'.split(' ')

  return (
    <footer
      id="footer"
      ref={sectionRef}
      style={{
        background: '#242424',
        color: '#ffffff',
        paddingTop: '6rem',
        paddingBottom: '3rem',
      }}
    >
      <div className="container-main max-w-[640px] mx-auto text-center">
        {/* CTA Heading */}
        <h2
          ref={headingRef}
          className="heading-2 text-white overflow-hidden"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h2>

        <div ref={contentRef} style={{ opacity: 0 }}>
          <p className="body-text mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Приезжайте на просмотр. Вбейте координаты в навигатор.
          </p>

          <p
            className="caption-text mt-6 font-mono"
            style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}
          >
            55.395800, 49.296629
          </p>

          <a
            href="https://yandex.ru/maps/?pt=49.296629,55.395800&z=15&l=map"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 text-base font-medium transition-colors duration-300 hover:bg-[var(--background)]"
            style={{
              background: '#ffffff',
              color: '#242424',
              padding: '16px 40px',
              borderRadius: '100px',
            }}
          >
            Открыть в навигаторе
          </a>

          {/* Divider */}
          <div
            className="mx-auto mt-16 mb-8"
            style={{
              width: '60px',
              height: '1px',
              background: 'rgba(255,255,255,0.2)',
            }}
          />

          {/* Footer Links */}
          <p className="caption-text" style={{ color: 'rgba(255,255,255,0.5)' }}>
            новыесингели.рф
          </p>

          {/* Copyright */}
          <p className="caption-text mt-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2025 Новые Сингели. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
