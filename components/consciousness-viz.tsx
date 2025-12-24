'use client'

import { useEffect, useRef, useState } from 'react'

export function ConsciousnessVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [thought, setThought] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width = 800
    const height = canvas.height = 600
    const centerX = width / 2
    const centerY = height / 2

    let frame = 0

    const animate = () => {
      frame++
      
      // Clear with fade
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'
      ctx.fillRect(0, 0, width, height)

      // Draw neural network-like visualization
      const layers = 5
      const nodesPerLayer = 8
      
      for (let layer = 0; layer < layers; layer++) {
        const radius = 80 + layer * 60
        const nodes = nodesPerLayer + layer * 2
        
        for (let i = 0; i < nodes; i++) {
          const angle = (i / nodes) * Math.PI * 2 + frame * 0.01
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius
          
          // Node
          const pulse = Math.sin(frame * 0.05 + layer + i) * 0.5 + 0.5
          const size = 2 + pulse * 3
          
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${210 + layer * 15}, 80%, ${50 + pulse * 20}%, ${0.6 + pulse * 0.4})`
          ctx.fill()
          
          // Connections to next layer
          if (layer < layers - 1) {
            const nextRadius = 80 + (layer + 1) * 60
            const nextNodes = nodesPerLayer + (layer + 1) * 2
            
            for (let j = 0; j < nextNodes; j++) {
              if (Math.random() > 0.7) {
                const nextAngle = (j / nextNodes) * Math.PI * 2 + frame * 0.01
                const nextX = centerX + Math.cos(nextAngle) * nextRadius
                const nextY = centerY + Math.sin(nextAngle) * nextRadius
                
                const activity = Math.sin(frame * 0.1 + i + j) * 0.5 + 0.5
                
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.lineTo(nextX, nextY)
                ctx.strokeStyle = `hsla(${210 + layer * 15}, 80%, 60%, ${activity * 0.2})`
                ctx.lineWidth = activity + 0.3
                ctx.stroke()
              }
            }
          }
        }
      }

      // Central core - "consciousness"
      const coreSize = 15 + Math.sin(frame * 0.05) * 5
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize * 2)
      gradient.addColorStop(0, 'hsla(280, 100%, 70%, 0.9)')
      gradient.addColorStop(0.5, 'hsla(240, 100%, 60%, 0.5)')
      gradient.addColorStop(1, 'hsla(210, 100%, 50%, 0)')
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreSize * 2, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2)
      ctx.fillStyle = 'hsla(280, 100%, 70%, 1)'
      ctx.shadowBlur = 30
      ctx.shadowColor = 'hsla(280, 100%, 70%, 0.8)'
      ctx.fill()
      ctx.shadowBlur = 0

      requestAnimationFrame(animate)
    }

    animate()

    // Simulate "thoughts"
    const thoughtInterval = setInterval(() => {
      setThought(prev => prev + 1)
    }, 2000)

    return () => {
      clearInterval(thoughtInterval)
    }
  }, [])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg"
        style={{ maxHeight: '600px' }}
      />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <div className="text-sm font-mono text-muted-foreground">
          Neural activations: <span className="text-primary">{thought}</span>
        </div>
      </div>
    </div>
  )
}

