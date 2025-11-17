'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  
  return (
    <motion.section 
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-blue-800/8 rounded-full blur-3xl animate-floating"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/6 rounded-full blur-3xl animate-floating" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          className="mb-6 inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-sm font-medium text-accent bg-accent/10 px-4 py-2 rounded-full">
            ✨ Trusted by 100k+ travelers
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Your{" "}
          </motion.span>
          <motion.span 
            className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "backOut" }}
          >
            dream vacation
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            {" "}is just a few steps away
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          From flights and stays to visa assistance and curated itineraries. We handle every detail so you focus on creating memories.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <Link href="/auth">
            <motion.button 
              className="px-8 py-4 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg hover:shadow-xl duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Trip
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <motion.button 
            onClick={() => {
              // Scroll to services section
              const servicesSection = document.querySelector('[data-section="services"]');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                // Fallback: scroll down by viewport height * 3
                window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Destinations
          </motion.button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center pt-12 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          {/* $550k Funding raised */}
          <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.0,
              type: "spring",
              stiffness: 150,
              damping: 12
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="text-3xl sm:text-4xl font-bold text-accent mb-2 relative"
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 tabular-nums font-mono">
                $550k
              </span>
            </motion.div>
            <motion.p 
              className="text-sm text-muted-foreground font-medium group-hover:text-accent transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Funding raised
            </motion.p>
          </motion.div>

          {/* 24/7 Expert support */}
          <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.1,
              type: "spring",
              stiffness: 150,
              damping: 12
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="text-3xl sm:text-4xl font-bold text-accent mb-2 relative"
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 tabular-nums font-mono">
                24/7
              </span>
            </motion.div>
            <motion.p 
              className="text-sm text-muted-foreground font-medium group-hover:text-accent transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              Expert support
            </motion.p>
          </motion.div>

          {/* 100% Hassle-free */}
          <motion.div
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              type: "spring",
              stiffness: 150,
              damping: 12
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="text-3xl sm:text-4xl font-bold text-accent mb-2 relative"
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.div
                className="absolute inset-0 bg-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 tabular-nums font-mono">
                100%
              </span>
            </motion.div>
            <motion.p 
              className="text-sm text-muted-foreground font-medium group-hover:text-accent transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              Hassle-free
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
