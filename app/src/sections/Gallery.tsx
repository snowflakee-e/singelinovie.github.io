import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  {
    src: '/images/gallery-1.jpg',
    alt: 'Берег реки Камы с зелёной травой и голубым небом',
    caption: 'Берег Камы',
    width: '400px',
    aspect: '3/4',
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Широкая река Кама с рябью на воде',
    caption: 'Река Кама',
    width: '520px',
    aspect: '4/3',
  },
  {
    src: '/images/gallery-3.jpg',
    alt: 'Зелёные поля с домиками посёлка на горизонте',
    caption: 'Вид на посёлок',
    width: '400px',
    aspect: '3/4',
  },
  {
    src: '/images/gallery-4.jpg',
    alt: 'Обширные зелёные поля под облачным небом',
    caption: 'Просторы',
    width: '440px',
    aspect: '4/5',
  },
  {
    src: '/images/gallery-5.jpg',
    alt: 'Поля с кустарниками и дорогой, дома вдалеке',
    caption: 'Природа вокруг',
    width: '520px',
    aspect: '4/3',
  },
  {
    src: '/images/gallery-6.jpg',
    alt: 'Панорама реки Камы в ясный летний день',
    caption: 'Панорама Камы',
    width: '640px',
    aspect: '16/9',
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current) {
        const items = trackRef.current.querySelectorAll('.gallery-item')
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
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
      id="gallery"
      ref={sectionRef}
      style={{
        background: 'var(--background)',
        paddingTop: 'var(--section-padding)',
        paddingBottom: '4rem',
      }}
    >
      <div className="container-main mb-10">
        <span className="section-label">Территория</span>
        <h2 className="heading-2 mt-3">Окружение, которое вдохновляет</h2>
      </div>

      {/* Horizontal scroll gallery on desktop, vertical on mobile */}
      <div
        ref={trackRef}
        className="gallery-scroll flex flex-col md:flex-row gap-4 md:gap-4 px-6 md:px-0 md:pl-[var(--container-padding)] md:pr-[var(--container-padding)]"
      >
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="gallery-item relative flex-shrink-0 md:snap-start overflow-hidden"
            style={{
              borderRadius: 'var(--card-radius)',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: 'var(--card-radius)' }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                style={{ aspectRatio: item.aspect }}
                loading="lazy"
              />
              {/* Caption overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{
                  background: 'linear-gradient(to top, rgba(36,36,36,0.6) 0%, transparent 100%)',
                }}
              >
                <span className="caption-text text-white">{item.caption}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
