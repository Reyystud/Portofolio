"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    // Hide default cursor
    document.body.style.cursor = "none"

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.3,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      })
    }

    const handleLinkEnter = () => {
      gsap.to(cursor, {
        scale: 2,
        borderColor: "oklch(0.75 0.15 180)",
        backgroundColor: "oklch(0.75 0.15 180 / 0.1)",
        duration: 0.3,
      })
    }

    const handleLinkLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: "oklch(0.95 0 0)",
        backgroundColor: "transparent",
        duration: 0.3,
      })
    }

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Add hover effects to links and buttons
    const interactiveElements = document.querySelectorAll("a, button, input, textarea")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkEnter)
      el.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkEnter)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-foreground pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-primary pointer-events-none z-[9999] hidden md:block"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  )
}
