"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScaleInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  trigger?: boolean
  className?: string
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.8,
  trigger = true,
  className = "",
}: ScaleInProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease: "back.out",
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
  }, [delay, duration, trigger])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
