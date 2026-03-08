"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Animasi Muncul Awal (Initial Entrance)
      tl.fromTo(logoRef.current, 
        { scale: 0, rotation: -20, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
      )
      .fromTo(".sub-text", 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 }, "-=0.5"
      );

      // 2. Animasi Floating Elements (Background)
      gsap.to(".bg-blob", {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });

      // 3. Progress Logic & Pulse
      gsap.to({ value: 0 }, {
        value: 100,
        duration: 2.5, // Sedikit lebih lambat agar dramatis
        ease: "power4.inOut",
        onUpdate: function() {
          const currentVal = Math.round(this.targets()[0].value);
          setProgress(currentVal);
          
          // Efek guncangan kecil pada teks saat loading berjalan
          if (currentVal % 10 === 0) {
            gsap.to(textRef.current, { x: 2, duration: 0.1, yoyo: true, repeat: 1 });
          }
        },
        onComplete: () => {
          // 4. Exit Animation yang lebih keren
          const exitTl = gsap.timeline({ onComplete });
          
          exitTl.to(".loading-content", {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.in"
          })
          .to(containerRef.current, {
            clipPath: "circle(0% at 50% 50%)", // Efek menutup melingkar
            duration: 0.8,
            ease: "expo.inOut"
          });
        }
      });
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
      style={{ clipPath: "circle(150% at 50% 50%)" }} // Initial state for clipPath
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="bg-blob absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
        <div className="bg-blob absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <div ref={textRef} className="loading-content relative z-10 text-center space-y-8">
        <h1
          className="text-6xl md:text-8xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <span ref={logoRef} className="inline-block text-primary">R?</span>
        </h1>
        
        <div className="relative w-64 h-1.5 bg-secondary/30 rounded-full overflow-hidden mx-auto">
          {/* Progress Bar with Glow */}
          <div
            className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="sub-text space-y-2">
          <p className="text-primary font-mono text-lg font-bold">
            {progress}%
          </p>
          <p className="text-muted-foreground text-[10px] tracking-[0.5em] uppercase animate-pulse">
            System Initializing
          </p>
        </div>
      </div>
    </div>
  )
}