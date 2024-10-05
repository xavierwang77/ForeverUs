"use client"

import React, { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    life: number
}

const AutoFireworks: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let particles: Particle[] = []
        let animationFrameId: number

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createFirework = () => {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`
            const particleCount = 100

            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.random() * Math.PI * 2)
                const speed = Math.random() * 5 + 1
                particles.push({
                    x,
                    y,
                    size: Math.random() * 3 + 5,
                    speedX: Math.cos(angle) * speed,
                    speedY: Math.sin(angle) * speed,
                    color,
                    life: Math.random() * 50 + 50
                })
            }
        }

        const updateParticles = () => {
            particles = particles.filter(p => p.life > 0)
            particles.forEach(p => {
                p.x += p.speedX
                p.y += p.speedY
                p.speedY += 0.05 // Gravity effect
                p.life -= 1
                p.size *= 0.96 // Shrink particles over time
            })
        }

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => {
                ctx.globalAlpha = p.life / 100
                ctx.fillStyle = p.color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
            })
            ctx.globalAlpha = 1
        }

        const animate = () => {
            updateParticles()
            drawParticles()
            animationFrameId = requestAnimationFrame(animate)
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Create a new firework every 1.5 seconds
        const fireworkInterval = setInterval(createFirework, 380)

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
            clearInterval(fireworkInterval)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    )
}

export default AutoFireworks