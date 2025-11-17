'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Digital Marketer',
    content: 'Rimigo made planning my Bali trip incredibly easy. The itinerary suggestions were spot-on!',
    rating: 5
  },
  {
    name: 'Aditya Patel',
    role: 'Software Engineer',
    content: 'Best travel app I\'ve used. The visa assistance saved me so much time and stress.',
    rating: 5
  },
  {
    name: 'Sarah Khan',
    role: 'Photographer',
    content: 'The personalized recommendations helped me discover hidden gems I would never have found.',
    rating: 5
  },
]

export default function Testimonials() {
  return (
    <motion.section 
      id="testimonials" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance animate-fade-in-up">
            Loved by travelers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Join thousands of happy travelers who trust Rimigo for their adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name}
              className="bg-background border border-border rounded-2xl p-8 hover:border-accent/50 transition-all group cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              viewport={{ once: true }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed group-hover:text-accent transition-colors duration-300">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
