"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor) {
        e.preventDefault()
        const href = anchor.getAttribute("href")
        if (!href) return

        const element = document.querySelector(href)
        if (element) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: element,
              offsetY: 50,
            },
            ease: "power3.inOut",
          })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll()
  
  return <>{children}</>
}
