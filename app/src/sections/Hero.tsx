import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Animate headline words
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word')
      tl.fromTo(
        words,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, stagger: 0.08, duration: 1.2 }
      )
    }

    // Animate subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.85, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
    }

    // Animate CTA
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
    }

    return () => { tl.kill() }
  }, [])

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector('#about')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const headlineWords = 'Место, где растут корни'.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
        aria-label="Пейзаж коттеджного посёлка Новые Сингели на берегу реки Камы"
      >
        <source src="/images/hero-video.mov" type="video/quicktime" />
        <source src="/images/hero-video.mov" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to top, rgba(36,36,36,0.6) 0%, rgba(36,36,36,0.2) 40%, rgba(36,36,36,0) 70%)',
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col justify-end h-full"
        style={{
          zIndex: 3,
          paddingBottom: '8vh',
          paddingLeft: 'var(--container-padding)',
          paddingRight: 'var(--container-padding)',
        }}
      >
        <h1
          ref={headlineRef}
          className="heading-1 text-white overflow-hidden"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="body-large mt-6 text-white max-w-[480px]"
          style={{ opacity: 0 }}
        >
          Коттеджный посёлок на берегу Камы. 30 минут от Казани. Чистый воздух, современная инфраструктура, свобода строить дом мечты.
        </p>

        <a
          ref={ctaRef}
          href="#about"
          onClick={handleCtaClick}
          className="inline-block mt-10 text-sm font-medium transition-colors duration-300 hover:bg-[var(--background)]"
          style={{
            opacity: 0,
            background: '#ffffff',
            color: '#242424',
            padding: '14px 32px',
            borderRadius: '100px',
            letterSpacing: '0.02em',
            width: 'fit-content',
          }}
        >
          Узнать больше
        </a>
      </div>
    </section>
  )
}
