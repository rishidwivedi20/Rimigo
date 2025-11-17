'use client'

import { useState, useEffect } from 'react'
import { Cloud, Sun, Snowflake, Leaf, MapPin, Calendar, ThermometerSun, X, Sparkles, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const seasonalDestinations = [
  {
    season: 'Spring',
    icon: Sun,
    destinations: ['Japan (Cherry Blossoms)', 'Greece', 'Spain'],
    weather: 'Mild & Pleasant',
    temperature: '15-25°C',
    rainfall: 'Low',
    bestMonths: ['March', 'April', 'May'],
    highlights: ['Cherry Blossoms in Japan', 'Mediterranean warmth', 'Fewer crowds'],
    activities: ['Hiking', 'Sightseeing', 'Photography'],
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400&fit=crop&auto=format',
    colorBg: 'bg-yellow-500/10',
    colorText: 'text-yellow-600',
    colorAccent: 'from-yellow-500 to-orange-500'
  },
  {
    season: 'Summer',
    icon: Cloud,
    destinations: ['Iceland', 'Norway', 'Bali'],
    weather: 'Warm & Clear',
    temperature: '20-30°C',
    rainfall: 'Moderate',
    bestMonths: ['June', 'July', 'August'],
    highlights: ['Midnight Sun in Nordic countries', 'Perfect beach weather', 'Festival season'],
    activities: ['Beach', 'Festivals', 'Midnight Sun tours'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
    colorBg: 'bg-teal-500/10',
    colorText: 'text-teal-600',
    colorAccent: 'from-teal-500 to-cyan-500'
  },
  {
    season: 'Fall',
    icon: Leaf,
    destinations: ['Canada', 'South Korea', 'Germany'],
    weather: 'Cool & Colorful',
    temperature: '10-20°C',
    rainfall: 'Moderate',
    bestMonths: ['September', 'October', 'November'],
    highlights: ['Autumn foliage', 'Harvest festivals', 'Comfortable temperatures'],
    activities: ['Leaf peeping', 'Wine tours', 'Cultural festivals'],
    image: 'https://images.unsplash.com/photo-1507371341162-763b5e419618?w=600&h=400&fit=crop&auto=format',
    colorBg: 'bg-orange-400/10',
    colorText: 'text-orange-500',
    colorAccent: 'from-orange-400 to-red-400'
  },
  {
    season: 'Winter',
    icon: Snowflake,
    destinations: ['Switzerland', 'Japan (Skiing)', 'New Zealand'],
    weather: 'Snow & Aurora',
    temperature: '-5-10°C',
    rainfall: 'Low (Snow)',
    bestMonths: ['December', 'January', 'February'],
    highlights: ['Northern Lights', 'Winter sports', 'Holiday markets'],
    activities: ['Skiing', 'Aurora watching', 'Hot springs'],
    image: 'https://images.unsplash.com/photo-1548777123-bfb4426dade2?w=600&h=400&fit=crop&auto=format',
    colorBg: 'bg-blue-900/10',
    colorText: 'text-blue-800',
    colorAccent: 'from-blue-800 to-indigo-700'
  }
]

export default function SeasonalGuide() {
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Simulate loading for seasonal data
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const handleSeasonClick = (season) => {
    setSelectedSeason(season)
  }

  const handleBookSeason = () => {
    // Redirect to auth page for seasonal booking
    window.location.href = '/auth'
  }

  if (isLoading) {
    return (
      <motion.section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Travel by Season
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="bg-muted/50 border border-border rounded-2xl p-6 h-48"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-accent/20 rounded-full"></div>
                    <div className="h-6 bg-accent/20 rounded w-20"></div>
                  </div>
                  <div className="h-4 bg-accent/20 rounded w-24 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-accent/20 rounded w-16"></div>
                    <div className="h-3 bg-accent/20 rounded w-full"></div>
                    <div className="h-3 bg-accent/20 rounded w-3/4"></div>
                    <div className="h-3 bg-accent/20 rounded w-5/6"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <div className="w-64 mx-auto bg-muted rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full"
                style={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Loading seasonal recommendations...
            </p>
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-6">Travel by Season</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect time to visit based on weather and seasonal highlights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalDestinations.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.season}
                className={`${item.colorBg} border border-border rounded-2xl p-6 hover:border-accent/50 transition-all hover:shadow-lg cursor-pointer group`}
                onClick={() => handleSeasonClick(item)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`w-8 h-8 ${item.colorText}`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {item.season}
                  </h3>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">{item.weather}</p>
                <p className="text-xs text-muted-foreground mb-4">
                  <ThermometerSun className="w-3 h-3 inline mr-1" />
                  {item.temperature}
                </p>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">Best Destinations:</p>
                  <ul className="space-y-1">
                    {item.destinations.map((dest) => (
                      <motion.li 
                        key={dest} 
                        className="text-sm text-foreground flex items-center gap-2"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.span 
                          className="w-1.5 h-1.5 rounded-full bg-accent"
                          whileHover={{ scale: 1.5 }}
                        ></motion.span>
                        {dest}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.div 
                  className="mt-4 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  Click for details →
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Detailed Season Modal */}
        <AnimatePresence>
          {selectedSeason && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSeason(null)}
            >
              <motion.div
                className="bg-card border border-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={selectedSeason.image}
                    alt={selectedSeason.season}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${selectedSeason.colorAccent} opacity-70`}></div>
                  <div className="absolute top-6 right-6">
                    <button
                      onClick={() => setSelectedSeason(null)}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <selectedSeason.icon className="w-8 h-8" />
                      <h2 className="text-3xl font-bold">{selectedSeason.season} Travel</h2>
                    </div>
                    <p className="text-lg opacity-90">{selectedSeason.weather}</p>
                  </div>
                </div>

                <div className="p-8 max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Best Destinations
                      </h3>
                      <ul className="space-y-2 mb-6">
                        {selectedSeason.destinations.map((dest) => (
                          <li key={dest} className="flex items-center gap-3 text-foreground">
                            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedSeason.colorAccent}`}></span>
                            {dest}
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Best Months
                      </h3>
                      <div className="flex gap-2 mb-6">
                        {selectedSeason.bestMonths.map((month) => (
                          <span key={month} className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${selectedSeason.colorAccent} text-white`}>
                            {month}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Season Highlights
                      </h3>
                      <ul className="space-y-2 mb-6">
                        {selectedSeason.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-3 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-xl font-semibold text-foreground mb-4">Popular Activities</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedSeason.activities.map((activity) => (
                          <span key={activity} className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground border border-border">
                            {activity}
                          </span>
                        ))}
                      </div>

                      <div className="bg-muted/30 rounded-2xl p-4">
                        <h4 className="font-semibold text-foreground mb-2">Weather Info</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Temperature:</span>
                            <p className="font-medium text-foreground">{selectedSeason.temperature}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Rainfall:</span>
                            <p className="font-medium text-foreground">{selectedSeason.rainfall}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <motion.button
                      onClick={handleBookSeason}
                      className={`flex-1 px-6 py-3 rounded-full bg-gradient-to-r ${selectedSeason.colorAccent} text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book {selectedSeason.season} Trip
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => setSelectedSeason(null)}
                      className="px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
