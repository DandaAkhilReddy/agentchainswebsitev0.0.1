import { lazy, Suspense } from 'react'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'

const FeaturesGrid = lazy(() => import('./components/sections/FeaturesGrid'))
const HowItWorks = lazy(() => import('./components/sections/HowItWorks'))
const Pricing = lazy(() => import('./components/sections/Pricing'))
const BetaAccessForm = lazy(() => import('./components/sections/BetaAccessForm'))
const Footer = lazy(() => import('./components/sections/Footer'))

function SectionFallback() {
  return (
    <div className="w-full py-32 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-body">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <FeaturesGrid />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BetaAccessForm />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
