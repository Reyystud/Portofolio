"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface RotatingBorderProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function RotatingBorder({
  children,
  speed = 20,
  className = "",
}: RotatingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!borderRef.current) return

    gsap.to(borderRef.current, {
      rotation: 360,
      duration: speed,
      repeat: -1,
      ease: "none",
    })
  }, [speed])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_200%] pointer-events-none"
        style={{
          padding: "2px",
        }}
      />
      <div className="relative bg-background rounded-2xl p-6">
        {children}
      </div>
    </div>
  )
}
