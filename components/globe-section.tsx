'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface PopularDestination {
  name: string
  lat: number
  lng: number
  visitors: number
  color: string
}

const POPULAR_DESTINATIONS: PopularDestination[] = [
  { name: 'Japan', lat: 36.2048, lng: 138.2529, visitors: 2850, color: '#e74c3c' },
  { name: 'Thailand', lat: 15.8700, lng: 100.9925, visitors: 2620, color: '#e67e22' },
  { name: 'France', lat: 46.2276, lng: 2.2137, visitors: 2900, color: '#3498db' },
  { name: 'Italy', lat: 41.8719, lng: 12.5674, visitors: 2350, color: '#e91e63' },
  { name: 'Spain', lat: 40.4637, lng: -3.7492, visitors: 1950, color: '#f39c12' },
  { name: 'USA', lat: 37.0902, lng: -95.7129, visitors: 3100, color: '#9b59b6' },
  { name: 'Australia', lat: -25.2744, lng: 133.7751, visitors: 1520, color: '#1abc9c' },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253, visitors: 1350, color: '#27ae60' },
]

function latLngToCartesian(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  }
}

export default function GlobeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const globeRef = useRef<THREE.Mesh | null>(null)
  const markersRef = useRef<THREE.Object3D[]>([])
  const [activeDestination, setActiveDestination] = useState<string | null>(null)
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 2.5
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0xfafafa, 1)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const geometry = new THREE.SphereGeometry(1, 64, 64)
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024
    const ctx = canvas.getContext('2d')!
    
    // Create gradient from light blue to light purple
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#e0e7ff')
    gradient.addColorStop(0.5, '#f0e7ff')
    gradient.addColorStop(1, '#e0e7ff')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.MeshPhongMaterial({ map: texture })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)
    globeRef.current = globe

    const light = new THREE.DirectionalLight(0xffffff, 0.8)
    light.position.set(5, 3, 5)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))

    POPULAR_DESTINATIONS.forEach((dest, index) => {
      setTimeout(() => {
        const pos = latLngToCartesian(dest.lat, dest.lng, 1.15)
        
        const markerGroup = new THREE.Group()
        
        // Outer sphere (glow)
        const glowGeometry = new THREE.SphereGeometry(0.08, 32, 32)
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(dest.color),
          transparent: true,
          opacity: 0.3,
        })
        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        markerGroup.add(glow)

        // Inner sphere (solid)
        const markerGeometry = new THREE.SphereGeometry(0.05, 32, 32)
        const markerMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(dest.color),
          emissive: new THREE.Color(dest.color),
          emissiveIntensity: 0.5,
        })
        const marker = new THREE.Mesh(markerGeometry, markerMaterial)
        markerGroup.add(marker)

        markerGroup.position.set(pos.x, pos.y, pos.z)
        markerGroup.userData = { name: dest.name, visitors: dest.visitors }
        scene.add(markerGroup)
        markersRef.current.push(markerGroup)
      }, index * 150)
    })

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const intersects = raycasterRef.current.intersectObjects(markersRef.current, true)

      markersRef.current.forEach((marker) => {
        const glow = marker.children[0] as THREE.Mesh
        const markerMesh = marker.children[1] as THREE.Mesh
        if (glow) glow.scale.set(1, 1, 1)
        if (markerMesh) markerMesh.scale.set(1, 1, 1)
      })

      if (intersects.length > 0) {
        const markerGroup = intersects[0].object.parent || intersects[0].object
        if (markerGroup && markerGroup.children.length >= 2) {
          const glow = markerGroup.children[0] as THREE.Mesh
          const markerMesh = markerGroup.children[1] as THREE.Mesh
          if (glow) glow.scale.set(1.5, 1.5, 1.5)
          if (markerMesh) markerMesh.scale.set(1.4, 1.4, 1.4)
          if (markerGroup.userData && markerGroup.userData.name) {
            setActiveDestination(markerGroup.userData.name)
          }
        }
      } else {
        setActiveDestination(null)
      }
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove)

    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Rotate globe slowly
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.0002
      }

      // Animate markers
      markersRef.current.forEach((marker) => {
        const glow = marker.children[0] as THREE.Mesh
        if (glow && glow.material && !Array.isArray(glow.material)) {
          const material = glow.material as THREE.MeshBasicMaterial
          material.opacity = 0.3 + 0.15 * Math.sin(Date.now() * 0.003 + marker.position.x)
        }
      })

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationFrameId)
      
      // Clean up Three.js resources
      markersRef.current.forEach((marker) => {
        marker.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (child.material && !Array.isArray(child.material)) {
              child.material.dispose()
            }
          }
        })
        scene.remove(marker)
      })
      
      if (globeRef.current) {
        globeRef.current.geometry.dispose()
        if (globeRef.current.material && !Array.isArray(globeRef.current.material)) {
          globeRef.current.material.dispose()
        }
      }
      
      renderer.dispose()
      
      // Safely remove canvas element
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Explore Global Destinations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most loved travel destinations. Hover over the markers to see details.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
          <div ref={containerRef} className="w-full h-96 sm:h-[500px] bg-white dark:bg-slate-800" />
          
          {activeDestination && (
            <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 px-4 py-3 rounded-lg shadow-lg border border-border animate-in fade-in duration-300">
              <p className="text-sm font-semibold text-foreground">{activeDestination}</p>
              <p className="text-xs text-muted-foreground">Popular destination</p>
            </div>
          )}

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-border max-w-xs">
            <p className="text-xs font-semibold text-foreground mb-3">Popular Destinations</p>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_DESTINATIONS.slice(0, 4).map((dest) => (
                <div key={dest.name} className="text-xs flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dest.color }}
                  />
                  <span className="text-muted-foreground">{dest.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: 'Total Destinations', value: POPULAR_DESTINATIONS.length },
            { label: 'Countries Covered', value: '100+' },
            { label: 'Active Travelers', value: '50K+' },
            { label: 'Success Rate', value: '98%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-lg bg-white dark:bg-slate-800 border border-border">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
