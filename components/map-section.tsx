'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MapPin, X } from 'lucide-react'

// Popular destinations with coordinates
const destinations = [
  { name: 'Paris, France', coordinates: [2.3522, 48.8566], description: 'City of Love and Lights' },
  { name: 'Tokyo, Japan', coordinates: [139.6917, 35.6895], description: 'Modern metropolis meets tradition' },
  { name: 'New York, USA', coordinates: [-74.006, 40.7128], description: 'The city that never sleeps' },
  { name: 'Bali, Indonesia', coordinates: [115.0920, -8.4095], description: 'Tropical paradise' },
  { name: 'Rome, Italy', coordinates: [12.4964, 41.9028], description: 'Eternal city of history' },
  { name: 'Dubai, UAE', coordinates: [55.2708, 25.2048], description: 'Modern oasis in the desert' },
  { name: 'Sydney, Australia', coordinates: [151.2093, -33.8688], description: 'Harbor city down under' },
  { name: 'London, UK', coordinates: [-0.1276, 51.5074], description: 'Royal heritage and culture' }
]

export default function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [selectedDestination, setSelectedDestination] = useState<any>(null)
  const [showDestinationInfo, setShowDestinationInfo] = useState(false)

  useEffect(() => {
    // Load Mapbox GL JS script
    const script = document.createElement('script')
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.17.0-beta.1/mapbox-gl.js'
    script.async = true
    document.head.appendChild(script)

    // Load Mapbox GL CSS
    const link = document.createElement('link')
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.17.0-beta.1/mapbox-gl.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    script.onload = () => {
      if (map.current) return // initialize map only once
      
      const mapboxgl = (window as any).mapboxgl
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoZWVzaDA3IiwiYSI6ImNtZHcycGtqaTBsa3gyaXB6aTdxZDYzcm8ifQ.HZ4nknBCzt7rsEvWiS1YZg'
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/standard',
        projection: 'globe',
        zoom: 1,
        center: [30, 15]
      })

      map.current.addControl(new mapboxgl.NavigationControl())
      map.current.scrollZoom.disable()

      map.current.on('style.load', () => {
        map.current.setFog({})
        
        // Add destination markers
        destinations.forEach((destination) => {
          // Create marker element
          const el = document.createElement('div')
          el.className = 'marker'
          el.style.backgroundImage = 'url(data:image/svg+xml;base64,' + btoa(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" fill="#3B82F6" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="10" r="3" fill="white"/>
            </svg>
          `) + ')'
          el.style.width = '24px'
          el.style.height = '24px'
          el.style.backgroundSize = '100%'
          el.style.cursor = 'pointer'
          el.style.borderRadius = '50%'
          el.style.border = '2px solid white'
          
          // Add click event
          el.addEventListener('click', () => {
            setSelectedDestination(destination)
            setShowDestinationInfo(true)
            map.current.flyTo({
              center: destination.coordinates,
              zoom: 6,
              duration: 2000
            })
          })
          
          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat(destination.coordinates)
            .addTo(map.current)
        })
      })
      
      // Add click handler for map
      map.current.on('click', (e: any) => {
        const coords = e.lngLat
        console.log('Clicked at:', coords.lng, coords.lat)
      })
    }

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  // Listen for booking requests from quiz results
  useEffect(() => {
    const handleBookingRequest = () => {
      if (!selectedDestination) {
        // Auto-select a popular destination if none selected
        const popularDestination = destinations[0] // Paris by default
        setSelectedDestination(popularDestination)
        if (map.current) {
          map.current.flyTo({
            center: popularDestination.coordinates,
            zoom: 6,
            duration: 1000
          })
        }
      }
      setTimeout(() => setShowBookingModal(true), 500)
    }

    const handleDestinationFocus = (event: any) => {
      const targetDestination = event.detail
      if (targetDestination && map.current) {
        // Find matching destination in our list or use the coordinates directly
        const matchingDestination = destinations.find(dest => 
          dest.name.toLowerCase().includes(targetDestination.name.toLowerCase())
        )
        
        if (matchingDestination) {
          setSelectedDestination(matchingDestination)
          setShowDestinationInfo(true)
          map.current.flyTo({
            center: matchingDestination.coordinates,
            zoom: 6,
            duration: 2000
          })
        } else {
          // Create temporary destination object for quiz recommendations
          const tempDestination = {
            name: targetDestination.name,
            coordinates: targetDestination.coordinates,
            description: 'Recommended based on your quiz preferences'
          }
          setSelectedDestination(tempDestination)
          setShowDestinationInfo(true)
          map.current.flyTo({
            center: targetDestination.coordinates,
            zoom: 6,
            duration: 2000
          })
        }
      }
    }

    window.addEventListener('openBookingModal', handleBookingRequest)
    window.addEventListener('focusDestination', handleDestinationFocus)
    
    return () => {
      window.removeEventListener('openBookingModal', handleBookingRequest)
      window.removeEventListener('focusDestination', handleDestinationFocus)
    }
  }, [selectedDestination])

  const handleExploreDestinations = () => {
    // Zoom out to show all destinations
    if (map.current) {
      map.current.flyTo({
        center: [30, 15],
        zoom: 1,
        duration: 2000
      })
    }
    setShowDestinationInfo(false)
  }

  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showTripPlanModal, setShowTripPlanModal] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    travelers: 1,
    budgetRange: 'moderate'
  })

  const handleStartTrip = () => {
    // Redirect to auth page for trip planning
    window.location.href = '/auth'
  }

  const handleBookNow = () => {
    // Redirect to auth page for trip booking
    window.location.href = '/auth'
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send data to your booking API
    setShowBookingModal(false)
    setShowTripPlanModal(false)
    alert(`Booking confirmed for ${selectedDestination?.name}! Check your email for details. ✅`)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section data-section="map" className="py-16 px-4 bg-background relative">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4">Explore Destinations</h2>
          <p className="text-muted-foreground text-lg">Click on the markers to discover amazing places around the world</p>
          
          <div className="flex gap-4 justify-center mt-6">
            <button 
              onClick={handleExploreDestinations}
              className="px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Show All Destinations
            </button>
            <button 
              onClick={handleStartTrip}
              className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Start Your Trip
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            ref={mapContainer} 
            className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg"
          />
          
          {/* Destination Info Popup */}
          {showDestinationInfo && selectedDestination && (
            <div className="absolute top-4 right-4 bg-background border border-border rounded-lg p-4 shadow-lg max-w-sm z-10">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-foreground text-lg">{selectedDestination.name}</h3>
                <button 
                  onClick={() => setShowDestinationInfo(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-muted-foreground mb-4">{selectedDestination.description}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowTripPlanModal(true)}
                  className="flex-1 px-4 py-2 rounded-md bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  Plan Trip
                </button>
                <button 
                  onClick={() => {
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedDestination.name + ' travel guide')}`, '_blank')
                  }}
                  className="flex-1 px-4 py-2 rounded-md border border-border text-foreground font-medium hover:bg-muted transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Trip Planning Modal */}
        {showTripPlanModal && selectedDestination && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">Plan Your Trip to {selectedDestination.name}</h3>
                <button 
                  onClick={() => setShowTripPlanModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Destination Info */}
                <div className="bg-muted/30 rounded-xl p-4">
                  <h4 className="font-semibold text-foreground mb-2">📍 Destination Highlights</h4>
                  <p className="text-muted-foreground mb-3">{selectedDestination.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Best Time to Visit:</span>
                      <p className="text-muted-foreground">March - May, September - November</p>
                    </div>
                    <div>
                      <span className="font-medium">Average Stay:</span>
                      <p className="text-muted-foreground">5-7 days recommended</p>
                    </div>
                  </div>
                </div>

                {/* Quick Planning Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/20 border border-border rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🏨</div>
                    <h5 className="font-medium mb-1">Accommodation</h5>
                    <p className="text-sm text-muted-foreground">Hotels, resorts & unique stays</p>
                  </div>
                  <div className="bg-muted/20 border border-border rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">✈️</div>
                    <h5 className="font-medium mb-1">Flights</h5>
                    <p className="text-sm text-muted-foreground">Best routes & deals</p>
                  </div>
                  <div className="bg-muted/20 border border-border rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <h5 className="font-medium mb-1">Activities</h5>
                    <p className="text-sm text-muted-foreground">Tours & experiences</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={handleBookNow}
                    className="flex-1 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    Book This Trip
                  </button>
                  <button 
                    onClick={() => setShowTripPlanModal(false)}
                    className="flex-1 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                  >
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedDestination && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background border border-border rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">Book Your Trip</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="bg-accent/10 rounded-lg p-3 mb-4">
                  <p className="font-medium text-accent">🌟 {selectedDestination.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedDestination.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={bookingData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background text-foreground"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={bookingData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background text-foreground"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background text-foreground"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Check-in Date *</label>
                    <input 
                      type="date" 
                      required
                      value={bookingData.checkIn}
                      onChange={(e) => handleInputChange('checkIn', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Check-out Date *</label>
                    <input 
                      type="date" 
                      required
                      value={bookingData.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Travelers</label>
                    <select 
                      value={bookingData.travelers}
                      onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background text-foreground"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                    <select 
                      value={bookingData.budgetRange}
                      onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent bg-background text-foreground"
                    >
                      <option value="budget">Budget ($500-1500)</option>
                      <option value="moderate">Moderate ($1500-3000)</option>
                      <option value="comfortable">Comfortable ($3000-5000)</option>
                      <option value="luxury">Luxury ($5000+)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
