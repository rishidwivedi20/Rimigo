'use client'

import { useState } from 'react'
import { AlertCircle, TrendingDown, Clock, Plane, Search, ExternalLink, Star, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FlightTracker() {
  const [activeTab, setActiveTab] = useState('tracker')
  const [flightNumber, setFlightNumber] = useState('')
  const [trackedFlights, setTrackedFlights] = useState([
    {
      flight: 'AI 101',
      route: 'DEL → BOM',
      status: 'On Time',
      departure: '14:30',
      arrival: '16:45',
      gate: 'A12',
      terminal: 'T3'
    },
    {
      flight: 'BA 142',
      route: 'LHR → JFK',
      status: 'Delayed 25min',
      departure: '09:15',
      arrival: '13:40',
      gate: 'B7',
      terminal: 'T5'
    }
  ])

  const [hotelComparisons] = useState([
    {
      name: 'The Grand Palace Hotel',
      location: 'Paris City Center',
      rating: 4.5,
      reviews: 2847,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop',
      prices: [
        { site: 'Booking.com', price: 289, logo: '🏨' },
        { site: 'Expedia', price: 312, logo: '✈️' },
        { site: 'Hotels.com', price: 295, logo: '🏨' },
        { site: 'Agoda', price: 278, logo: '🌏' }
      ]
    },
    {
      name: 'Seaside Resort & Spa',
      location: 'Bali Beachfront',
      rating: 4.8,
      reviews: 1923,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop',
      prices: [
        { site: 'MakeMyTrip', price: 156, logo: '🇮🇳' },
        { site: 'Goibibo', price: 149, logo: '🎯' },
        { site: 'Booking.com', price: 168, logo: '🏨' },
        { site: 'Airbnb', price: 142, logo: '🏠' }
      ]
    },
    {
      name: 'Mountain Lodge Retreat',
      location: 'Swiss Alps',
      rating: 4.6,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      prices: [
        { site: 'Expedia', price: 425, logo: '✈️' },
        { site: 'Booking.com', price: 398, logo: '🏨' },
        { site: 'TripAdvisor', price: 445, logo: '🦉' },
        { site: 'Hotels.com', price: 412, logo: '🏨' }
      ]
    }
  ])

  const handleTrackFlight = () => {
    if (flightNumber.trim()) {
      const newFlight = {
        flight: flightNumber.toUpperCase(),
        route: 'NYC → LAX',
        status: 'Boarding',
        departure: '18:30',
        arrival: '21:45',
        gate: 'C15',
        terminal: 'T4'
      }
      setTrackedFlights([newFlight, ...trackedFlights])
      setFlightNumber('')
      alert(`Flight ${flightNumber.toUpperCase()} is now being tracked! You'll receive real-time updates.`)
    }
  }

  const getBestPrice = (prices: any[]) => {
    return Math.min(...prices.map(p => p.price))
  }

  return (
    <motion.section 
      className="py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Real-Time Flight Intelligence & Price Comparison
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Track flights, compare hotel prices, and get the best travel deals
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-muted/30 rounded-full p-1">
            <motion.button 
              onClick={() => setActiveTab('tracker')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === 'tracker' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Flight Tracker
            </motion.button>
            <motion.button 
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === 'comparison' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Price Comparison
            </motion.button>
          </div>
        </motion.div>

        {activeTab === 'tracker' ? (
          <div className="space-y-8">
            {/* Flight Intelligence Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer hover:border-accent/50 animate-fade-in-up opacity-0 animation-fill-forwards animation-delay-200 hover-lift">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-200 animate-float">
                    <AlertCircle className="w-6 h-6 text-red-500 animate-pulse hover:animate-bounce" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Smart Alerts</h3>
                    <p className="text-sm text-muted-foreground">Get delay predictions up to 6 hours before airlines announce them</p>
                  </div>
                </div>
              </div>

              <div className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer hover:border-accent/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Price Monitoring</h3>
                    <p className="text-sm text-muted-foreground">Watch prices and get notified when your flights drop</p>
                  </div>
                </div>
              </div>

              <div className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer hover:border-accent/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Live Tracking</h3>
                    <p className="text-sm text-muted-foreground">Track aircraft in real-time with gate info and ETA updates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Search */}
            <div className="bg-background border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Track Your Flight</h3>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground"
                    placeholder="Enter flight number (e.g., AI 101, BA 142)"
                  />
                </div>
                <button 
                  onClick={handleTrackFlight}
                  className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 hover-grow animate-shimmer"
                >
                  <Search className="w-4 h-4" />
                  Track Flight
                </button>
              </div>
            </div>

            {/* Tracked Flights */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Your Tracked Flights</h3>
              {trackedFlights.map((flight, index) => (
                <div key={index} className={`bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-all animate-fade-in-up opacity-0 animation-fill-forwards hover-lift`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Plane className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{flight.flight}</h4>
                        <p className="text-sm text-muted-foreground">{flight.route}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      flight.status.includes('Delayed') 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        : flight.status === 'On Time'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent'
                    }`}>
                      {flight.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block">Departure</span>
                      <span className="font-medium text-foreground">{flight.departure}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Arrival</span>
                      <span className="font-medium text-foreground">{flight.arrival}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Gate</span>
                      <span className="font-medium text-foreground">{flight.gate}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Terminal</span>
                      <span className="font-medium text-foreground">{flight.terminal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Hotel Price Comparison</h3>
              <p className="text-muted-foreground">Compare prices from multiple booking sites to get the best deals</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {hotelComparisons.map((hotel, index) => (
                <div key={index} className={`bg-background border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all animate-scale-in opacity-0 animation-fill-forwards hover-lift`} style={{ animationDelay: `${index * 0.2 + 0.3}s` }}>
                  <div className="relative">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=${encodeURIComponent(hotel.name.split(' ')[0])}`
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-sm font-medium text-gray-700">
                      Best: ${getBestPrice(hotel.prices)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-1">{hotel.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{hotel.location}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm text-foreground">{hotel.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({hotel.reviews} reviews)</span>
                    </div>
                    
                    <div className="space-y-2">
                      {hotel.prices.sort((a, b) => a.price - b.price).map((price, priceIndex) => (
                        <div key={priceIndex} className={`flex items-center justify-between p-3 rounded-lg border ${
                          price.price === getBestPrice(hotel.prices)
                            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                            : 'border-border bg-muted/30'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{price.logo}</span>
                            <span className="text-sm font-medium text-foreground">{price.site}</span>
                            {price.price === getBestPrice(hotel.prices) && (
                              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">Best Deal</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">${price.price}</span>
                            <button className="text-accent hover:text-accent/80 transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">You save:</span>
                        <span className="font-bold text-green-600">
                          ${Math.max(...hotel.prices.map(p => p.price)) - getBestPrice(hotel.prices)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto">
                <DollarSign className="w-4 h-4" />
                View More Deals
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}
