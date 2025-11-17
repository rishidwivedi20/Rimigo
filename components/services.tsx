'use client'

import { useState } from 'react'
import { Plane, Home, MapPin, FileText, Dessert as Passport, Heart, X, Calendar, Users, DollarSign, Search, Star, Clock, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Plane,
    title: 'Flights',
    description: 'Best prices on flights worldwide. Compare and book instantly with exclusive deals.',
    color: 'from-accent/20 to-accent/5'
  },
  {
    icon: Home,
    title: 'Stays',
    description: 'Curated accommodations from luxury resorts to cozy boutique hotels.',
    color: 'from-green-400/20 to-green-400/5'
  },
  {
    icon: MapPin,
    title: 'Tours',
    description: 'Handpicked local experiences and guided tours at every destination.',
    color: 'from-orange-500/20 to-orange-500/5'
  },
  {
    icon: FileText,
    title: 'Itinerary',
    description: 'AI-powered personalized itineraries based on your preferences.',
    color: 'from-blue-900/20 to-blue-900/5'
  },
  {
    icon: Passport,
    title: 'Visa',
    description: 'Visa assistance and documentation support for your destination.',
    color: 'from-amber-200/30 to-amber-100/10'
  },
  {
    icon: Heart,
    title: 'Travel Insurance',
    description: 'Comprehensive coverage for peace of mind on every trip.',
    color: 'from-red-400/20 to-red-400/5'
  },
]

export default function Services() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    budget: '',
    checkIn: '',
    checkOut: '',
    rooms: 1
  })

  const handleServiceClick = (serviceTitle: string) => {
    setActiveModal(serviceTitle)
  }

  const handleInputChange = (field: string, value: string | number) => {
    setSearchForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSearch = (serviceType: string) => {
    // Redirect to auth page for booking services
    window.location.href = '/auth'
  }

  const renderModal = () => {
    if (!activeModal) return null

    const modalContent = {
      'Flights': (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Plane className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground">Book Flights</h3>
            <p className="text-muted-foreground">Find the best flight deals worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">From</label>
              <input 
                type="text" 
                value={searchForm.from}
                onChange={(e) => handleInputChange('from', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                placeholder="New York (NYC)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">To</label>
              <input 
                type="text" 
                value={searchForm.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                placeholder="Paris (CDG)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Departure</label>
              <input 
                type="date" 
                value={searchForm.departure}
                onChange={(e) => handleInputChange('departure', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Return</label>
              <input 
                type="date" 
                value={searchForm.return}
                onChange={(e) => handleInputChange('return', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">Passengers</label>
              <select 
                value={searchForm.passengers}
                onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
              <select 
                value={searchForm.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
              >
                <option value="">Any Budget</option>
                <option value="economy">Economy ($200-800)</option>
                <option value="business">Business ($800-2000)</option>
                <option value="first">First Class ($2000+)</option>
              </select>
            </div>
          </div>

          <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-accent" />
              <span className="font-medium text-accent dark:text-accent">Flight Features</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Price match guarantee</li>
              <li>• Free cancellation within 24hrs</li>
              <li>• Real-time price alerts</li>
              <li>• Seat selection assistance</li>
            </ul>
          </div>

          <button 
            onClick={() => handleSearch('Flights')}
            className="w-full px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search Flights
          </button>
        </div>
      ),
      
      'Stays': (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Home className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground">Book Accommodation</h3>
            <p className="text-muted-foreground">From luxury resorts to cozy boutique hotels</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Destination</label>
              <input 
                type="text" 
                value={searchForm.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 bg-background text-foreground"
                placeholder="Enter city or hotel name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Check-in</label>
              <input 
                type="date" 
                value={searchForm.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Check-out</label>
              <input 
                type="date" 
                value={searchForm.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 bg-background text-foreground"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">Guests</label>
              <select 
                value={searchForm.passengers}
                onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 bg-background text-foreground"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">Rooms</label>
              <select 
                value={searchForm.rooms}
                onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-emerald-500 bg-background text-foreground"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-4 h-4 text-emerald-500" />
              <span className="font-medium text-emerald-700 dark:text-emerald-300">Stay Features</span>
            </div>
            <ul className="text-sm text-emerald-600 dark:text-emerald-400 space-y-1">
              <li>• Curated luxury & boutique properties</li>
              <li>• Free cancellation options</li>
              <li>• Best price guarantee</li>
              <li>• 24/7 customer support</li>
            </ul>
          </div>

          <button 
            onClick={() => handleSearch('Hotels')}
            className="w-full px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search Hotels
          </button>
        </div>
      ),

      'Tours': (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground">Book Tours & Experiences</h3>
            <p className="text-muted-foreground">Handpicked local experiences worldwide</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Destination</label>
              <input 
                type="text" 
                value={searchForm.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 bg-background text-foreground"
                placeholder="Where do you want to explore?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date</label>
              <input 
                type="date" 
                value={searchForm.departure}
                onChange={(e) => handleInputChange('departure', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Travelers</label>
              <select 
                value={searchForm.passengers}
                onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-orange-500 bg-background text-foreground"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Experience Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['Cultural Tours', 'Adventure', 'Food & Drink', 'Nature', 'Historical', 'Photography'].map(type => (
                <label key={type} className="flex items-center space-x-2 p-2 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-foreground">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-orange-700 dark:text-orange-300">Tour Features</span>
            </div>
            <ul className="text-sm text-orange-600 dark:text-orange-400 space-y-1">
              <li>• Local expert guides</li>
              <li>• Small group sizes</li>
              <li>• Skip-the-line access</li>
              <li>• Authentic experiences</li>
            </ul>
          </div>

          <button 
            onClick={() => handleSearch('Tours')}
            className="w-full px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Find Experiences
          </button>
        </div>
      ),

      'Itinerary': (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground">AI Itinerary Planner</h3>
            <p className="text-muted-foreground">Personalized trip plans based on your interests</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Destination</label>
              <input 
                type="text" 
                value={searchForm.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 bg-background text-foreground"
                placeholder="Where are you planning to go?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Trip Duration</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 bg-background text-foreground">
                <option value="2-3">2-3 days</option>
                <option value="4-6">4-6 days</option>
                <option value="1-week">1 week</option>
                <option value="2-weeks">2 weeks</option>
                <option value="longer">Longer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Travel Style</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-purple-500 bg-background text-foreground">
                <option value="relaxed">Relaxed</option>
                <option value="moderate">Moderate</option>
                <option value="packed">Action-packed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Interests</label>
            <div className="grid grid-cols-3 gap-2">
              {['Museums', 'Restaurants', 'Nightlife', 'Shopping', 'Nature', 'Architecture', 'Beach', 'Adventure', 'Culture'].map(interest => (
                <label key={interest} className="flex items-center space-x-2 p-2 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-accent" />
                  <span className="text-xs text-foreground">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-accent" />
              <span className="font-medium text-accent dark:text-accent">AI Features</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Personalized recommendations</li>
              <li>• Optimized routes & timing</li>
              <li>• Budget-conscious planning</li>
              <li>• Real-time updates</li>
            </ul>
          </div>

          <button 
            onClick={() => handleSearch('Itinerary')}
            className="w-full px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Create Itinerary
          </button>
        </div>
      ),

      'Visa': (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Passport className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground">Visa Assistance</h3>
            <p className="text-muted-foreground">Professional visa support & documentation</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Nationality</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-rose-500 bg-background text-foreground">
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Destination Country</label>
              <input 
                type="text" 
                value={searchForm.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-rose-500 bg-background text-foreground"
                placeholder="Where are you traveling?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Travel Date</label>
              <input 
                type="date" 
                value={searchForm.departure}
                onChange={(e) => handleInputChange('departure', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-rose-500 bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Purpose</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-rose-500 bg-background text-foreground">
                <option value="tourism">Tourism</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="work">Work</option>
                <option value="family">Family Visit</option>
              </select>
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Passport className="w-4 h-4 text-rose-500" />
              <span className="font-medium text-rose-700 dark:text-rose-300">Visa Services</span>
            </div>
            <ul className="text-sm text-rose-600 dark:text-rose-400 space-y-1">
              <li>• Visa requirement checking</li>
              <li>• Document preparation assistance</li>
              <li>• Application submission support</li>
              <li>• Status tracking & updates</li>
            </ul>
          </div>

          <button 
            onClick={() => handleSearch('Visa')}
            className="w-full px-6 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
          >
            <Passport className="w-4 h-4" />
            Check Visa Requirements
          </button>
        </div>
      ),

      'Travel Insurance': (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground">Travel Insurance</h3>
            <p className="text-muted-foreground">Comprehensive coverage for peace of mind</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Trip Destination</label>
              <input 
                type="text" 
                value={searchForm.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-red-500 bg-background text-foreground"
                placeholder="Where are you traveling?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Trip Cost</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-red-500 bg-background text-foreground">
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500-5000">$2,500 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000+">$10,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Departure Date</label>
              <input 
                type="date" 
                value={searchForm.departure}
                onChange={(e) => handleInputChange('departure', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-red-500 bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Travelers</label>
              <select 
                value={searchForm.passengers}
                onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-red-500 bg-background text-foreground"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Coverage Options</label>
            <div className="space-y-2">
              {['Trip Cancellation', 'Medical Coverage', 'Baggage Protection', 'Emergency Evacuation', 'Adventure Sports'].map(coverage => (
                <label key={coverage} className="flex items-center space-x-2 p-2 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-red-500" defaultChecked />
                  <span className="text-sm text-foreground">{coverage}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="font-medium text-red-700 dark:text-red-300">Insurance Benefits</span>
            </div>
            <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
              <li>• 24/7 emergency assistance</li>
              <li>• Worldwide coverage</li>
              <li>• Quick claim processing</li>
              <li>• Pre-existing condition coverage</li>
            </ul>
          </div>

          <button 
            onClick={() => handleSearch('Travel Insurance')}
            className="w-full px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Get Insurance Quote
          </button>
        </div>
      )
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-background border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <button 
              onClick={() => setActiveModal(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {modalContent[activeModal as keyof typeof modalContent]}
        </div>
      </div>
    )
  }

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance animate-fade-in-up">
            Everything you need for your perfect trip
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            One platform, endless possibilities. From flights to visa, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                onClick={() => handleServiceClick(service.title)}
                className={`bg-gradient-to-br ${service.color} border border-border rounded-2xl p-8 hover:border-accent/50 transition-all hover:shadow-lg cursor-pointer group glass-effect`}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true, margin: "-30px" }}
              >
                <div className="inline-flex p-3 bg-background rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {renderModal()}
    </section>
  )
}
