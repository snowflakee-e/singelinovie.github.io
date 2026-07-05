import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function FloatingButton() {
  const [visible, setVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [visible])

  const handleClick = () => {
    const target = document.querySelector('#footer')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="fixed z-50 text-sm font-medium transition-all duration-300 hover:shadow-lg"
      style={{
        bottom: '2rem',
        right: '2rem',
        background: 'var(--accent)',
        color: '#ffffff',
        padding: '14px 28px',
        borderRadius: '100px',
        opacity: 0,
        boxShadow: '0 4px 20px rgba(61, 90, 64, 0.3)',
        cursor: 'pointer',
        border: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#2d442f'
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(61, 90, 64, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--accent)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(61, 90, 64, 0.3)'
      }}
    >
      Связаться
    </button>
  )
}
