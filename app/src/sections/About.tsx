import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'Река Кама',
    desc: 'Рыбалка, отдых, чистый воздух',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8V32" stroke="#3d5a40" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 8C20 8 12 14 12 20C12 26 20 32 20 32" stroke="#3d5a40" strokeWidth="1.5" />
        <path d="M20 8C20 8 28 14 28 20C28 26 20 32 20 32" stroke="#3d5a40" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: '30 минут до Казани',
    desc: 'Асфальтированный подъезд',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 32L16 20L20 24L28 12" stroke="#3d5a40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 20H32" stroke="#3d5a40" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: 'Свобода',
    desc: 'Стройте дом мечты на своей земле',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 32V18L20 10L32 18V32H8Z" stroke="#3d5a40" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M17 32V24H23V32" stroke="#3d5a40" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text block animation
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        )
      }

      // Features animation
      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll('.feature-item')
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Images animation
      if (imagesRef.current) {
        const imgs = imagesRef.current.querySelectorAll('.about-img')
        gsap.fromTo(
          imgs,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imagesRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: 'var(--background)',
        paddingTop: 'var(--section-padding)',
        paddingBottom: 'var(--section-padding)',
      }}
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Text Column */}
          <div ref={textRef} className="lg:w-[55%]">
            <span className="section-label">О посёлке</span>
            <h2 className="heading-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              Земля и дом, которые станут вашей опорой
            </h2>
            <p
              className="body-text mt-6 max-w-[520px]"
              style={{ color: 'var(--text-secondary)' }}
            >
              Новые Сингели — коттеджный посёлок в живописном месте на берегу реки Камы.
              Удобный асфальтированный подъезд, современная инфраструктура и чистый воздух.
              Здесь можно купить участок в беспроцентную рассрочку или готовый дом с землёй
              по цене городской квартиры.
            </p>

            {/* Features Grid */}
            <div
              ref={featuresRef}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
            >
              {features.map((feature) => (
                <div key={feature.title} className="feature-item">
                  {feature.icon}
                  <h3 className="heading-3 mt-4">{feature.title}</h3>
                  <p className="caption-text mt-2" style={{ color: 'var(--text-secondary)' }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Images Column */}
          <div ref={imagesRef} className="lg:w-[45%] flex flex-col gap-6">
            <div className="about-img ml-[10%] w-[90%]">
              <img
                src="/images/about-1.jpg"
                alt="Берег реки Камы с зелёной травой и голубым небом"
                className="w-full h-auto object-cover"
                style={{ borderRadius: 'var(--card-radius)', aspectRatio: '4/3' }}
                loading="lazy"
              />
            </div>
            <div className="about-img ml-[15%] w-[75%]">
              <img
                src="/images/about-2.jpg"
                alt="Широкая река Кама с рябью на воде и лесом на горизонте"
                className="w-full h-auto object-cover"
                style={{ borderRadius: 'var(--card-radius)', aspectRatio: '3/4' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
