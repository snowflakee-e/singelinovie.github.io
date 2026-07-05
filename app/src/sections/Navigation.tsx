import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const navLinks = [
  { label: 'О посёлке', href: '#about' },
  { label: 'Участки', href: '#pricing' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Контакты', href: '#footer' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        opacity: scrolled ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [scrolled])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 opacity-0 transition-colors duration-300"
      style={{
        height: '72px',
        background: scrolled ? 'rgba(243, 240, 233, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="container-main h-full flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="text-base font-medium"
          style={{ color: scrolled ? 'var(--text-primary)' : '#ffffff' }}
        >
          Новые Сингели
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="nav-text transition-colors duration-300 hover:text-[var(--text-primary)]"
              style={{ color: scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.7)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
