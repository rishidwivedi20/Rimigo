'use client'

import { useState } from 'react'
import { Star, Users, MapPin, Clock, X, Calendar, CreditCard, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const experiences = [
  {
    title: 'Heritage Walk with Local Historians',
    location: 'Old Goa, India',
    rating: 4.93,
    reviews: 110,
    description: 'Explore 400 years of history with expert storytellers',
    price: '₹1,100',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop&auto=format',
    duration: '3 hours',
    groupSize: 'Max 12 people',
    includes: ['Local guide', 'Historical artifacts', 'Traditional snacks']
  },
  {
    title: 'Mount Fuji Sunrise Expedition',
    location: 'Mount Fuji, Japan',
    rating: 4.89,
    reviews: 256,
    description: 'Watch Japan\'s iconic peak wake up with local guides',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?w=400&h=300&fit=crop&auto=format',
    duration: '6 hours',
    groupSize: 'Max 8 people',
    includes: ['Transport', 'Professional guide', 'Breakfast']
  },
  {
    title: 'Balinese Culture Immersion',
    location: 'Ubud, Bali',
    rating: 4.96,
    reviews: 342,
    description: 'Learn traditional crafts from master artisans',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop&auto=format',
    duration: '4 hours',
    groupSize: 'Max 10 people',
    includes: ['Materials', 'Master artisan', 'Certificate']
  },
  {
    title: 'Paris Culinary Walking Tour',
    location: 'Montmartre, Paris',
    rating: 4.91,
    reviews: 189,
    description: 'Taste authentic French delicacies with local chefs',
    price: '€85',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format',
    duration: '3.5 hours',
    groupSize: 'Max 15 people',
    includes: ['Food tastings', 'Chef guide', 'Wine samples']
  },
  {
    title: 'Sahara Desert Stargazing',
    location: 'Merzouga, Morocco',
    rating: 4.88,
    reviews: 278,
    description: 'Astronomical journey under the clearest skies on Earth',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop&auto=format',
    duration: '5 hours',
    groupSize: 'Max 6 people',
    includes: ['Telescope', 'Astronomer guide', 'Desert camp']
  },
  {
    title: 'Northern Lights Photography',
    location: 'Tromsø, Norway',
    rating: 4.94,
    reviews: 156,
    description: 'Capture the Aurora Borealis with professional photographers',
    price: '$180',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop&auto=format',
    duration: '8 hours',
    groupSize: 'Max 4 people',
    includes: ['Camera equipment', 'Photo guide', 'Hot drinks']
  }
]

export default function ExpertExperiences() {
  const [selectedExperience, setSelectedExperience] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingData, setBookingData] = useState({
    date: '',
    travelers: 1,
    name: '',
    email: '',
    phone: ''
  })

  const handleBookExperience = (experience: any) => {
    // Redirect to auth page for booking
    window.location.href = '/auth'
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Experience booked successfully!\n\n${selectedExperience.title}\nDate: ${bookingData.date}\nTravelers: ${bookingData.travelers}\n\nConfirmation email sent to ${bookingData.email}`)
    setShowBookingModal(false)
    setSelectedExperience(null)
  }

  return (
    <motion.section 
      className="py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">Expert-Led Experiences</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immersive tours led by local historians, artists, and travel experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.title} 
              className="bg-background border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              onClick={() => setSelectedExperience(exp)}
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&auto=format`
                  }}
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {exp.location}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{exp.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {exp.groupSize}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm text-foreground">{exp.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({exp.reviews} reviews)</span>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Includes:</p>
                  <div className="flex flex-wrap gap-1">
                    {exp.includes.map((item, index) => (
                      <span key={index} className="bg-muted/50 text-xs px-2 py-1 rounded-full text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Per person</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-accent text-lg">{exp.price}</span>
                    <button 
                      onClick={() => handleBookExperience(exp)}
                      className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedExperience && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background border border-border rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-foreground">Book Experience</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-foreground">{selectedExperience.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedExperience.location}</p>
                <p className="text-accent font-bold mt-2">{selectedExperience.price} per person</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                    <input 
                      type="date" 
                      required
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Travelers</label>
                    <select 
                      value={bookingData.travelers}
                      onChange={(e) => setBookingData({...bookingData, travelers: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input 
                    type="tel" 
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total ({bookingData.travelers} {bookingData.travelers === 1 ? 'person' : 'people'})</span>
                    <span className="font-bold text-foreground">
                      {selectedExperience.price.replace(/[^0-9]/g, '') ? 
                        `${selectedExperience.price.match(/[^0-9]+/)?.[0] || '$'}${parseInt(selectedExperience.price.replace(/[^0-9]/g, '')) * bookingData.travelers}` :
                        selectedExperience.price
                      }
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}
