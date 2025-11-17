import { ArrowRight, Plane, Home as HomeIcon, MapPin, FileText, Dessert as Passport, Heart, MailCheck as MapPinCheck, TrendingUp } from 'lucide-react'
import Navigation from '@/components/navigation'
import AnimatedBackground from '@/components/animated-background'
import PageLoader from '@/components/page-loader'
import Hero from '@/components/hero'
import QuizSection from '@/components/quiz-section'
import MapSection from '@/components/map-section'
import Services from '@/components/services'
import SeasonalGuide from '@/components/seasonal-guide'
import FlightTracker from '@/components/flight-tracker'
import ExpertExperiences from '@/components/expert-experiences'
import Features from '@/components/features'
import Testimonials from '@/components/testimonials'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <PageLoader />
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <QuizSection />
      <MapSection />
      <Services />
      <SeasonalGuide />
      <FlightTracker />
      <ExpertExperiences />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
