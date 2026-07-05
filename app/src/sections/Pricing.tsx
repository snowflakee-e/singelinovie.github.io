import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    type: 'Участок',
    title: 'Земельный участок',
    description: 'Свободная планировка. Стройте дом мечты на своей земле.',
    specs: '8 соток',
    price: 'от 65 000',
    priceUnit: '/ сотка',
    note: 'Рассрочка 0%',
    featured: false,
  },
  {
    type: 'Дом',
    title: 'Старт',
    description: 'Компактный уютный дом для начала новой жизни. Продуманная планировка, все коммуникации, современный дизайн.',
    specs: '38 м² · участок 8 соток',
    price: 'от 2 800 000',
    priceUnit: '₽',
    note: 'Все коммуникации подключены',
    featured: true,
  },
  {
    type: 'Дом',
    title: 'Комфорт',
    description: 'Просторный современный дом для комфортной жизни семьи. Большие окна, светлые помещения, просторная терраса.',
    specs: '85 м² · участок 8 соток',
    price: '6 000 000',
    priceUnit: '₽',
    note: 'Полностью готовый к проживанию',
    featured: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cardEls = cardsRef.current.querySelectorAll('.pricing-card')
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
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
      id="pricing"
      ref={sectionRef}
      style={{
        background: 'var(--background)',
        paddingTop: 'var(--section-padding)',
        paddingBottom: 'var(--section-padding)',
      }}
    >
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Участки и дома</span>
          <h2 className="heading-2 mt-3">Выберите свой вариант</h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="pricing-card group relative flex flex-col p-8 transition-all duration-400"
              style={{
                background: 'var(--surface)',
                border: `1px solid ${card.featured ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 'var(--card-radius)',
                boxShadow: card.featured ? '0 4px 24px rgba(61, 90, 64, 0.08)' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = '0 12px 40px rgba(36, 36, 36, 0.08)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = card.featured ? '0 4px 24px rgba(61, 90, 64, 0.08)' : 'none'
              }}
            >
              {card.featured && (
                <span
                  className="absolute top-4 right-4 caption-text px-3 py-1"
                  style={{
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                    borderRadius: '100px',
                  }}
                >
                  Популярное
                </span>
              )}

              <span
                className="section-label"
                style={{ color: 'var(--accent)' }}
              >
                {card.type}
              </span>

              <h3 className="heading-3 mt-2">{card.title}</h3>

              <p
                className="body-text mt-3 flex-grow"
                style={{ color: 'var(--text-secondary)' }}
              >
                {card.description}
              </p>

              <p
                className="caption-text mt-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {card.specs}
              </p>

              <div className="mt-6">
                <span className="price-text" style={{ color: 'var(--text-primary)' }}>
                  {card.price}{' '}
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {card.priceUnit}
                  </span>
                </span>
              </div>

              <p
                className="caption-text mt-3"
                style={{ color: 'var(--accent)' }}
              >
                {card.note}
              </p>

              <a
                href="#footer"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-block mt-6 caption-text transition-all duration-300 group-hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                Подробнее →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
