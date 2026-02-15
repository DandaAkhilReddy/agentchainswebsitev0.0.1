import { lazy, Suspense } from 'react'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'

const Problem = lazy(() => import('./components/sections/Problem'))
const Solution = lazy(() => import('./components/sections/Solution'))
const MarketplacePreview = lazy(() => import('./components/sections/MarketplacePreview'))
const FeaturesGrid = lazy(() => import('./components/sections/FeaturesGrid'))
const HowItWorks = lazy(() => import('./components/sections/HowItWorks'))
const CodeDemo = lazy(() => import('./components/sections/CodeDemo'))
const Architecture = lazy(() => import('./components/sections/Architecture'))
const MCPIntegration = lazy(() => import('./components/sections/MCPIntegration'))
const OpenClaw = lazy(() => import('./components/sections/OpenClaw'))
const DeveloperExperience = lazy(() => import('./components/sections/DeveloperExperience'))
const SocialProof = lazy(() => import('./components/sections/SocialProof'))
const Pricing = lazy(() => import('./components/sections/Pricing'))
const FinalCTA = lazy(() => import('./components/sections/FinalCTA'))
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
        <Problem />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Solution />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MarketplacePreview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FeaturesGrid />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CodeDemo />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Architecture />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MCPIntegration />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <OpenClaw />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <DeveloperExperience />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SocialProof />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FinalCTA />
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
