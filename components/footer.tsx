"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative py-12 px-6 border-t border-border bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div
          ref={textRef}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <span
              className="text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              REYY
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">
              Muhammad Rafiandhi Suryadinata
            </span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Built with{" "}
            <span className="text-primary">Next.js</span>,{" "}
            <span className="text-primary">GSAP</span>, and{" "}
            <span className="text-primary">Tailwind CSS</span>
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
