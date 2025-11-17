# Rimigo - Premium Travel Booking Platform

A modern, feature-rich travel booking website built with Next.js 16 and enhanced with sophisticated animations and interactive elements.

## 🌟 Live Features

### 🎨 Visual Design & Animations
- **Elegant Color Palette**: Cream background (#ECE7DC) with navy, teal, mint, and orange accents
- **Framer Motion Animations**: Progressive section loading with staggered entrance effects
- **Interactive 3D Globe**: Three.js powered globe showing popular travel destinations
- **Smooth Scrolling Navigation**: Seamless page transitions and section navigation
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### 🚀 Core Functionality

#### Authentication System
- **Phone-based Login/Signup**: Modern OTP-style authentication
- **Form Validation**: Real-time input validation with error handling
- **Secure Session Management**: Protected routes and user state management

#### Interactive Components
- **Hero Section**: Animated statistics display with hover effects
- **Services Grid**: Six core travel services with icon animations
- **Expert Experiences**: Curated travel packages with image galleries
- **Flight Tracker**: Real-time flight status visualization
- **Seasonal Guide**: Dynamic travel recommendations by season
- **Customer Testimonials**: Rotating testimonial carousel
- **Quiz Section**: Interactive travel preference assessment

#### Statistics & Counters
- **Animated Counters**: Smooth counting animations in CTA section
- **Performance Metrics**: $550k+ saved, 24/7 support, 100% satisfaction rate
- **Real-time Updates**: Dynamic data visualization

### 🛠 Technical Architecture

#### Framework & Performance
- **Next.js 16.0.3**: Latest React framework with Turbopack
- **TypeScript**: Full type safety and IntelliSense support
- **Tailwind CSS**: Utility-first styling with custom design system
- **Font Optimization**: Inter and JetBrains Mono with proper fallbacks

#### Animation & Interaction
- **Framer Motion**: Advanced animation library for micro-interactions
- **Three.js Integration**: 3D graphics with proper memory management
- **Intersection Observer**: Performance-optimized scroll animations
- **Custom Hooks**: Reusable animation and state logic

#### UI Component Library
- **Shadcn/ui Components**: 35+ production-ready components
- **Custom Design System**: Consistent spacing, colors, and typography
- **Accessibility Features**: WCAG compliant interactive elements
- **Dark/Light Mode**: Theme switching capabilities

## 🎯 Detailed Component Breakdown

### Navigation System
- **Sticky Header**: Persistent navigation with smooth background transitions
- **Mobile Menu**: Responsive hamburger menu with slide animations
- **Active State Indicators**: Visual feedback for current page section
- **Call-to-Action Button**: Prominent booking initiation

### Hero Section (`components/hero.tsx`)
- **Background Gradient**: Subtle cream to white gradient overlay
- **Animated Typography**: Staggered text animations with proper timing
- **Statistics Display**: Three key metrics with hover effects
- **Primary CTA**: "Start Your Journey" button with animation states

### Services Grid (`components/services.tsx`)
- **Six Service Categories**:
  1. Flight Booking - Comprehensive airline search
  2. Hotel Reservations - Accommodation finder
  3. Car Rentals - Vehicle booking system
  4. Travel Insurance - Protection plans
  5. Tour Packages - Curated experiences
  6. Visa Assistance - Documentation help
- **Icon Animations**: Hover states with scale and color transitions
- **Service Descriptions**: Detailed feature explanations

### Expert Experiences (`components/expert-experiences.tsx`)
- **Curated Packages**: Hand-picked travel experiences
- **Image Galleries**: High-quality destination photography
- **Pricing Display**: Transparent cost breakdowns
- **Booking Integration**: Direct reservation links

### Interactive Globe (`components/globe-section.tsx`)
- **3D Visualization**: WebGL-powered Earth representation
- **Clickable Destinations**: Interactive location markers
- **Smooth Rotation**: Continuous globe animation
- **Destination Info**: Popup details for each location
- **Performance Optimized**: Proper cleanup and memory management

### Flight Tracker (`components/flight-tracker.tsx`)
- **Real-time Status**: Live flight information display
- **Route Visualization**: Departure and arrival details
- **Status Indicators**: On-time, delayed, boarding states
- **Interactive Timeline**: Flight progress tracking

### Seasonal Guide (`components/seasonal-guide.tsx`)
- **Dynamic Recommendations**: Season-specific travel suggestions
- **Weather Integration**: Climate-based destination matching
- **Activity Suggestions**: Seasonal activity recommendations
- **Best Time Indicators**: Optimal travel period guidance

### Customer Testimonials (`components/testimonials.tsx`)
- **Rotating Carousel**: Smooth testimonial transitions
- **Customer Photos**: Authentic user imagery
- **Rating System**: Star-based review display
- **Social Proof**: Verified customer badges

### Interactive Quiz (`components/quiz-section.tsx`)
- **Travel Preferences**: Personalized recommendation engine
- **Multi-step Flow**: Progressive question presentation
- **Result Calculation**: Algorithmic destination matching
- **Animated Transitions**: Smooth question navigation

### Call-to-Action Section (`components/cta.tsx`)
- **Animated Statistics**: Counting animations from 0 to target values
- **Performance Metrics**:
  - **$550k+ Saved**: Total customer savings
  - **24/7 Support**: Round-the-clock assistance
  - **100% Satisfaction**: Customer happiness rate
- **Smooth Easing**: Natural counting progression with proper cleanup

### Footer (`components/footer.tsx`)
- **Comprehensive Links**: Service pages, company info, legal
- **Social Media**: Platform integration links
- **Newsletter Signup**: Email subscription form
- **Contact Information**: Multi-channel communication options

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager
- Git for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/rishidwivedi20/Rimigo.git

# Navigate to project directory
cd Rimigo

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

### Environment Setup
The project runs on `http://localhost:3000` with Turbopack for fast refresh and optimized builds.

### Build Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Type checking
npm run type-check
```

## 📁 Project Structure

```
rimigo/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage with all sections
│   ├── auth/              # Authentication pages
│   └── globals.css        # Global styles and variables
├── components/            # React components
│   ├── ui/               # Shadcn/ui component library
│   ├── hero.tsx          # Landing section
│   ├── services.tsx      # Service offerings
│   ├── navigation.tsx    # Header navigation
│   ├── globe-section.tsx # 3D interactive globe
│   ├── cta.tsx           # Call-to-action with counters
│   └── [other-components]
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/              # Static assets
└── styles/              # Additional stylesheets
```

## 🎨 Design System

### Color Palette
- **Primary Background**: #ECE7DC (Warm Cream)
- **Navy Accent**: #1e293b (Deep Navy)
- **Teal Accent**: #0d9488 (Professional Teal)
- **Mint Accent**: #10b981 (Fresh Mint)
- **Orange Accent**: #f97316 (Energetic Orange)

### Typography
- **Primary Font**: Inter (Modern Sans-serif)
- **Monospace Font**: JetBrains Mono (Code/Numbers)
- **Fallback**: System font stack for reliability

### Animation Principles
- **Entrance Animations**: Staggered reveals with spring physics
- **Hover States**: Subtle scale and color transitions
- **Loading States**: Progressive content appearance
- **Micro-interactions**: Contextual feedback on user actions

## 🚀 Performance Optimizations

### Loading Performance
- **Font Optimization**: Preloaded Google Fonts with fallbacks
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic component-level code splitting
- **Bundle Analysis**: Optimized dependency bundling

### Animation Performance
- **GPU Acceleration**: CSS transforms for smooth animations
- **Intersection Observer**: Efficient scroll-triggered animations
- **Memory Management**: Proper cleanup for Three.js components
- **Reduced Motion**: Respects user accessibility preferences

### SEO & Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Meta Tags**: Comprehensive social media and search optimization
- **Alt Text**: Descriptive image alternatives
- **Keyboard Navigation**: Full keyboard accessibility support

## 🔮 Future Enhancements

### Planned Features
- **Payment Integration**: Stripe/PayPal checkout system
- **User Dashboard**: Booking history and preferences
- **Real-time Chat**: Customer support integration
- **Mobile App**: React Native companion app
- **AI Recommendations**: Machine learning travel suggestions

### Technical Roadmap
- **Progressive Web App**: Offline functionality
- **GraphQL Integration**: Efficient data fetching
- **Microservices**: Scalable backend architecture
- **Real-time Updates**: WebSocket integration for live data

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
