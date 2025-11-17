'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface SectionRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function SectionReveal({ 
  children, 
  delay = 0, 
  duration = 0.8,
  className = ""
}: SectionRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px" 
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        y: 80,
        scale: 0.95
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0, 1],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  )
}