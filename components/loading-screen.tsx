"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )

      // Progress animation
      gsap.to({ value: 0 }, {
        value: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function() {
          setProgress(Math.round(this.targets()[0].value))
        },
        onComplete: () => {
          // Exit animation
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete,
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
    >
      <div ref={textRef} className="text-center space-y-8">
        <h1
          className="text-4xl md:text-6xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span className="text-primary">REYY</span>
        </h1>
        
        <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-muted-foreground text-sm tracking-widest">
          LOADING... {progress}%
        </p>
      </div>
    </div>
  )
}
