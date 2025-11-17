'use client'

import { MailCheck as MapPinCheck, Zap, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: MapPinCheck,
    title: 'Personalized Recommendations',
    description: 'AI learns your preferences to suggest destinations and experiences tailored just for you. Your perfect trip awaits.'
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    description: 'Real-time availability and instant confirmations for flights, hotels, and experiences. No waiting, no hassle.'
  },
  {
    icon: Shield,
    title: '24/7 Support',
    description: 'Round-the-clock assistance from our travel experts. Questions? We\'re here to help whenever you need us.'
  },
]

export default function Features() {
  return (
    <motion.section 
      id="features" 
      className="py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance animate-fade-in-up">
            Why choose Rimigo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            We make vacation planning effortless so you can focus on what matters: making memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const animationClasses = [
              'animate-slide-in-left',
              'animate-scale-in',
              'animate-slide-in-right'
            ]
            return (
              <div 
                key={feature.title} 
                className={`flex flex-col ${animationClasses[index]} group cursor-pointer`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="inline-flex w-14 h-14 rounded-xl bg-accent/10 items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="w-7 h-7 text-accent group-hover:scale-125 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
