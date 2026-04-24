"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface BlurTextProps {
  text: string
  delay?: number
  duration?: number
  className?: string
}

export function BlurText({ text, delay = 0, duration = 0.8, className = "" }: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll(".blur-letter")
    if (letters && letters.length > 0) {
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration,
          stagger: 0.05,
          delay,
          ease: "power2.out",
        }
      )
    }
  }, [delay, duration])

  return (
    <div ref={containerRef} className={className}>
      {text.split("").map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          className="blur-letter inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  )
}
