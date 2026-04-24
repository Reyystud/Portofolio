"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  stagger?: number
  trigger?: boolean
  className?: string
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.8,
  stagger = 0,
  trigger = true,
  className = "",
}: FadeInUpProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
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

      if (stagger > 0) {
        const children = containerRef.current?.children
        if (children && children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: duration * 0.6,
              stagger,
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
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [delay, duration, stagger, trigger])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
