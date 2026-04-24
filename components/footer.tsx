"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

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
          className="flex flex-col space-y-6"
        >
          {/* Links Section */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Projects
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/experience" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Experience
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/animations" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Animations
            </Link>
            <span className="text-muted-foreground">•</span>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Main Footer Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <span
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                R.
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
      </div>
    </footer>
  )
}
