"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface WordRotateProps {
  words: string[]
  duration?: number
  className?: string
}

export function WordRotate({ words, duration = 3, className = "" }: WordRotateProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current || words.length === 0) return

    const rotate = () => {
      const nextIndex = (currentIndexRef.current + 1) % words.length
      
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.textContent = words[nextIndex]
            gsap.fromTo(
              containerRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            )
          }
          currentIndexRef.current = nextIndex
          
          // Schedule next rotation
          setTimeout(rotate, duration * 1000)
        },
      })
    }

    // Start first rotation after duration
    const timer = setTimeout(rotate, duration * 1000)

    return () => clearTimeout(timer)
  }, [words, duration])

  return (
    <div ref={containerRef} className={className}>
      {words[0]}
    </div>
  )
}
