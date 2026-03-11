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

      // 1. Initial Entrance
      tl.fromTo(logoRef.current, 
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power4.out" }
      )
      .fromTo(".sub-text", 
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }, "-=0.5"
      );

      // 2. Background Animation
      gsap.to(".bg-blob", {
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Progress Logic
      gsap.to({ value: 0 }, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function() {
          setProgress(Math.round(this.targets()[0].value));
        },
        onComplete: () => {
          // --- EXIT ANIMATION: HURUF NAIK KE ATAS ---
          const exitTl = gsap.timeline({ 
            onComplete,
            defaults: { ease: "expo.inOut" } 
          });
          
          exitTl
            .to([logoRef.current, ".sub-text"], {
              y: -150,           // Huruf naik ke atas
              opacity: 0,        // Menghilang
              filter: "blur(10px)", // Efek blur saat bergerak cepat
              stagger: 0.1,      // Berurutan (logo dulu baru teks bawah)
              duration: 0.8,
            })
            .to(containerRef.current, {
              yPercent: -100,    // Background ikut naik ke atas
              duration: 1,
            }, "-=0.6");         // Mulai sedikit sebelum huruf selesai naik
        }
      });
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-blob absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 blur-[120px] rounded-full" />
        <div className="bg-blob absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div ref={textRef} className="loading-content relative z-10 text-center space-y-12">
        {/* LOGO PERSEGI / HURUF */}
        <div className="relative inline-block">
          <span 
            ref={logoRef} 
            className="inline-block text-7xl md:text-9xl font-bold text-primary tracking-tighter"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            R?
          </span>
        </div>
        
        <div className="sub-text space-y-6">
          {/* PROGRESS BAR */}
          <div className="relative w-48 h-[2px] bg-secondary/20 rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-primary transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-primary font-sans text-sm font-bold tracking-widest">
              {progress}%
            </span>
            <span className="text-muted-foreground text-[10px] tracking-[0.4em] uppercase opacity-50">
              Initializing Experience
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}