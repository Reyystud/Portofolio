"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

interface NumberTickerProps {
  value: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function NumberTicker({
  value,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const obj = { current: 0 }

    gsap.to(obj, {
      current: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayValue(Math.floor(obj.current))
      },
    })
  }, [value, duration])

  return (
    <div ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </div>
  )
}
