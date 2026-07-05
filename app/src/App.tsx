import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Pricing from './sections/Pricing'
import Gallery from './sections/Gallery'
import Footer from './sections/Footer'
import FloatingButton from './sections/FloatingButton'

export default function App() {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <About />
      <Pricing />
      <Gallery />
      <Footer />
      <FloatingButton />
    </div>
  )
}
