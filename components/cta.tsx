'use client'

import { Palmtree, Star, Map, Banknote } from 'lucide-react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const statistics = [
  {
    icon: Palmtree,
    number: '242',
    value: 242,
    label: 'Vacations',
    color: 'text-teal-500'
  },
  {
    icon: Star,
    number: '4.9',
    value: 4.9,
    label: 'Traveler Ratings',
    color: 'text-orange-500'
  },
  {
    icon: Map,
    number: '78',
    value: 78,
    label: 'Countries',
    color: 'text-green-500'
  },
  {
    icon: Banknote,
    number: '8,354',
    value: 8354,
    label: 'Average Savings per trip',
    color: 'text-blue-800'
  }
]

// Animated counter component
function AnimatedCounter({ value, isVisible, isDecimal = false }: { value: number, isVisible: boolean, isDecimal?: boolean }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!isVisible) return
    
    let startTime: number
    let animationId: number
    const duration = 2500 // 2.5 seconds for more dramatic effect
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Enhanced easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = easeOutQuart * value
      
      setCount(currentValue)
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }
    
    animationId = requestAnimationFrame(animate)
    
    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [value, isVisible])
  
  // Format the display value based on type
  const formatValue = () => {
    if (isDecimal) {
      return count.toFixed(1)
    }
    
    if (value > 1000) {
      // For large numbers, show smooth counting and format with commas
      return Math.floor(count).toLocaleString()
    }
    
    return Math.floor(count).toString()
  }
  
  return (
    <span className="tabular-nums font-mono">
      {formatValue()}
    </span>
  )
}

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.section 
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/8 rounded-full blur-3xl animate-floating" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready for your best vacation yet?
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Submit your travel details below and get personalized vacation options designed just for you. Expert assistance awaits at every step.
          </motion.p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {statistics.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`w-12 h-12 ${stat.color}`} />
                </motion.div>
                <motion.div 
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 + index * 0.1 }}
                >
                  <AnimatedCounter 
                    value={stat.value} 
                    isVisible={isInView} 
                    isDecimal={stat.label === 'Traveler Ratings'}
                  />
                </motion.div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link href="/auth">
            <motion.button 
              className="px-12 py-4 rounded-full bg-accent text-accent-foreground text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: 0.8, 
                type: "spring", 
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -4,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -2, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Shimmer effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                  repeatDelay: 3
                }}
              />
              <span className="relative z-10">Start Your Trip</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
