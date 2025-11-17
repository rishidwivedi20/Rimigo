'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const quizQuestions = [
  {
    question: 'What\'s your ideal vacation style?',
    options: ['Adventure', 'Relaxation', 'Culture', 'Luxury']
  },
  {
    question: 'How much time do you have?',
    options: ['Weekend', '1 Week', '2 Weeks', 'Extended']
  },
  {
    question: 'What\'s your travel budget?',
    options: ['Budget', 'Moderate', 'Comfortable', 'Premium']
  }
]

export default function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [answers, setAnswers] = useState<string[]>([])

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers, selectedOption]
      setAnswers(newAnswers)
      
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(currentQ + 1)
        setSelectedOption(null)
      } else {
        setShowResults(true)
      }
    }
  }

  const handleRecommendations = () => {
    setShowResults(true)
  }

  const getRecommendations = () => {
    const style = answers[0] || 'Adventure'
    const time = answers[1] || 'Weekend'
    const budget = answers[2] || 'Budget'

    const destinations = {
      'Adventure': {
        primary: { name: 'Nepal', emoji: '🏔️', description: 'Himalayan trekking paradise' },
        secondary: { name: 'New Zealand', emoji: '🌿', description: 'Adventure sports capital' }
      },
      'Relaxation': {
        primary: { name: 'Maldives', emoji: '🏖️', description: 'Tropical overwater paradise' },
        secondary: { name: 'Bali', emoji: '🌺', description: 'Island of gods and wellness' }
      },
      'Culture': {
        primary: { name: 'Rome', emoji: '🏛️', description: 'Eternal city of history' },
        secondary: { name: 'Kyoto', emoji: '⛩️', description: 'Ancient temples and traditions' }
      },
      'Luxury': {
        primary: { name: 'Dubai', emoji: '✨', description: 'Modern luxury oasis' },
        secondary: { name: 'Switzerland', emoji: '🏔️', description: 'Alpine luxury retreats' }
      }
    }

    const stays = {
      'Budget': [
        { name: 'Cozy Hostels', price: '$25-50/night', features: ['Shared facilities', 'Social atmosphere', 'City center locations'] },
        { name: 'Local Guesthouses', price: '$30-60/night', features: ['Authentic experience', 'Local insights', 'Home-cooked meals'] }
      ],
      'Moderate': [
        { name: 'Boutique Hotels', price: '$80-150/night', features: ['Unique design', 'Personal service', 'Central location'] },
        { name: 'Mid-range Resorts', price: '$100-200/night', features: ['Pool & amenities', 'Daily housekeeping', 'Restaurant on-site'] }
      ],
      'Comfortable': [
        { name: 'Premium Hotels', price: '$200-350/night', features: ['Luxury amenities', 'Concierge service', 'Prime locations'] },
        { name: 'Beach Resorts', price: '$250-400/night', features: ['Ocean views', 'Spa services', 'Multiple restaurants'] }
      ],
      'Premium': [
        { name: '5-Star Hotels', price: '$400-800/night', features: ['Butler service', 'Michelin dining', 'Exclusive facilities'] },
        { name: 'Luxury Villas', price: '$500-1200/night', features: ['Private pools', 'Personal chef', 'Complete privacy'] }
      ]
    }

    const itineraries = {
      'Weekend': {
        duration: '2-3 Days',
        schedule: [
          'Day 1: Arrival & City Highlights Tour',
          'Day 2: Main Attractions & Cultural Sites',
          'Day 3: Leisure Activities & Departure'
        ]
      },
      '1 Week': {
        duration: '7 Days',
        schedule: [
          'Day 1-2: City Exploration & Orientation',
          'Day 3-4: Cultural Immersion & Local Experiences',
          'Day 5-6: Adventure Activities & Nature',
          'Day 7: Shopping & Departure Preparations'
        ]
      },
      '2 Weeks': {
        duration: '14 Days',
        schedule: [
          'Week 1: Primary destination deep dive',
          'Days 8-10: Secondary city exploration',
          'Days 11-13: Unique experiences & relaxation',
          'Day 14: Reflection & departure'
        ]
      },
      'Extended': {
        duration: '3+ Weeks',
        schedule: [
          'Week 1-2: Primary region exploration',
          'Week 3: Cultural immersion & local living',
          'Week 4+: Work opportunities or volunteering',
          'Final days: Planning return or next destination'
        ]
      }
    }

    return {
      destinations: destinations[style as keyof typeof destinations],
      stays: stays[budget as keyof typeof stays] || stays.Budget,
      itinerary: itineraries[time as keyof typeof itineraries] || itineraries.Weekend
    }
  }

  return (
    <motion.section 
      data-section="quiz" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-accent" />
            <h2 className="text-4xl font-bold text-foreground">Find Your Perfect Trip</h2>
          </div>
          <p className="text-lg text-muted-foreground">Take our 1-minute quiz to get personalized recommendations</p>
        </div>

        <div className="bg-background border border-border rounded-2xl p-8 shadow-lg">
          {!showResults ? (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  {quizQuestions[currentQ].question}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quizQuestions[currentQ].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-4 rounded-lg border text-left transition-all font-medium ${
                        selectedOption === option 
                          ? 'border-accent bg-accent/10 text-accent' 
                          : 'border-border text-foreground hover:border-accent hover:bg-accent/5'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Question {currentQ + 1} of {quizQuestions.length}
                </div>
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedOption 
                      ? 'bg-accent text-accent-foreground hover:opacity-90' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {currentQ === quizQuestions.length - 1 ? 'Get Recommendations' : 'Next'}
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="text-center mb-8">
                <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">Your Personalized Trip Recommendations</h3>
                <p className="text-muted-foreground">Based on your preferences: {answers.join(' • ')}</p>
              </div>
              
              {(() => {
                const recommendations = getRecommendations()
                return (
                  <div className="space-y-6">
                    {/* Destinations */}
                    <div className="bg-muted/30 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        🌍 Recommended Destinations
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background border border-border rounded-lg p-4">
                          <h5 className="font-semibold text-foreground flex items-center gap-2">
                            {recommendations.destinations.primary.emoji} {recommendations.destinations.primary.name}
                          </h5>
                          <p className="text-muted-foreground text-sm mt-1">{recommendations.destinations.primary.description}</p>
                        </div>
                        <div className="bg-background border border-border rounded-lg p-4">
                          <h5 className="font-semibold text-foreground flex items-center gap-2">
                            {recommendations.destinations.secondary.emoji} {recommendations.destinations.secondary.name}
                          </h5>
                          <p className="text-muted-foreground text-sm mt-1">{recommendations.destinations.secondary.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Accommodation */}
                    <div className="bg-muted/30 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        🏨 Recommended Stays
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendations.stays.map((stay, index) => (
                          <div key={index} className="bg-background border border-border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold text-foreground">{stay.name}</h5>
                              <span className="text-accent font-medium text-sm">{stay.price}</span>
                            </div>
                            <ul className="text-muted-foreground text-sm space-y-1">
                              {stay.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1 h-1 bg-accent rounded-full"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Itinerary */}
                    <div className="bg-muted/30 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        📅 Suggested Itinerary ({recommendations.itinerary.duration})
                      </h4>
                      <div className="bg-background border border-border rounded-lg p-4">
                        <ul className="space-y-3">
                          {recommendations.itinerary.schedule.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                                {index + 1}
                              </span>
                              <span className="text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button 
                        onClick={() => {
                          // Get recommended destination based on quiz answers
                          const destinations = {
                            'Adventure': { name: 'Nepal', coordinates: [85.3240, 28.3949] },
                            'Relaxation': { name: 'Maldives', coordinates: [73.2207, 3.2028] },
                            'Culture': { name: 'Rome, Italy', coordinates: [12.4964, 41.9028] },
                            'Luxury': { name: 'Dubai, UAE', coordinates: [55.2708, 25.2048] }
                          }
                          
                          const selectedStyle = answers[0] || 'Adventure'
                          const targetDestination = destinations[selectedStyle as keyof typeof destinations]
                          
                          // Scroll to map section
                          const mapSection = document.querySelector('[data-section="map"]')
                          if (mapSection) {
                            mapSection.scrollIntoView({ behavior: 'smooth' })
                            
                            // Send destination data to map after scroll
                            setTimeout(() => {
                              const event = new CustomEvent('focusDestination', {
                                detail: targetDestination
                              })
                              window.dispatchEvent(event)
                            }, 1000)
                          }
                        }}
                        className="flex-1 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
                      >
                        Explore on Map
                      </button>
                      <button 
                        onClick={() => {
                          setShowResults(false)
                          setCurrentQ(0)
                          setAnswers([])
                          setSelectedOption(null)
                        }}
                        className="flex-1 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                      >
                        Retake Quiz
                      </button>
                      <button 
                        onClick={() => {
                          // Redirect to auth page for booking
                          window.location.href = '/auth'
                        }}
                        className="flex-1 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                      >
                        Start Booking
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
