'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const { scrollYProgress } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', updateScroll)
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    const sections = ['services', 'features', 'testimonials']
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleSmoothScroll = (targetId: string) => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80 // Account for fixed nav height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleGetOTP = () => {
    // Redirect to auth page
    window.location.href = '/auth'
  }

  return (
    <motion.nav 
      className={`fixed top-0 w-full backdrop-blur-sm border-b border-border z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-lg' : 'bg-background/80'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.05 }}>
          <button 
            onClick={handleScrollToTop}
            className="flex items-center gap-2 hover:opacity-80 transition-all duration-300"
          >
            <motion.div 
              className="w-9 h-9 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5 text-accent-foreground" />
            </motion.div>
            <motion.span 
              className="font-bold text-lg text-foreground"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Rimigo
            </motion.span>
          </button>
        </motion.div>
        
        <motion.div 
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button 
            onClick={() => handleSmoothScroll('services')}
            className={`text-sm transition-all duration-300 relative ${
              activeSection === 'services' 
                ? 'text-accent font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Services
            {activeSection === 'services' && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
          <motion.button 
            onClick={() => handleSmoothScroll('features')}
            className={`text-sm transition-all duration-300 relative ${
              activeSection === 'features' 
                ? 'text-accent font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Why Rimigo
            {activeSection === 'features' && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
          <motion.button 
            onClick={() => handleSmoothScroll('testimonials')}
            className={`text-sm transition-all duration-300 relative ${
              activeSection === 'testimonials' 
                ? 'text-accent font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Stories
            {activeSection === 'testimonials' && (
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        </motion.div>

        <motion.button 
          onClick={handleGetOTP}
          className="px-6 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get OTP
        </motion.button>
      </div>
    </motion.nav>
  )
}
