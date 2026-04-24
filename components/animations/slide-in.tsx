"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SlideInProps {
  children: React.ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
  duration?: number
  trigger?: boolean
  className?: string
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.8,
  trigger = true,
  className = "",
}: SlideInProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const getInitialPosition = () => {
      switch (direction) {
        case "left":
          return { x: -100, y: 0 }
        case "right":
          return { x: 100, y: 0 }
        case "up":
          return { x: 0, y: 100 }
        case "down":
          return { x: 0, y: -100 }
        default:
          return { x: -100, y: 0 }
      }
    }

    const ctx = gsap.context(() => {
      const initialPos = getInitialPosition()
      
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: trigger
            ? {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              }
            : undefined,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [direction, delay, duration, trigger])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
