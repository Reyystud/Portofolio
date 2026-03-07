"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Github, Linkedin, Mail, Instagram, Menu, X } from "lucide-react"

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar animation
      gsap.fromTo(navRef.current, 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )

      const tl = gsap.timeline({ delay: 0.5 })
      tl.fromTo([nameRef.current, ".hero-text", ".social-links"], 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      )

      gsap.fromTo(photoRef.current,
        { opacity: 0, scale: 0.9, x: 20 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "expo.out", delay: 0.8 }
      )

      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Animasi Dropdown saat isOpen berubah
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        display: "block"
      })
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        display: "none"
      })
    }
  }, [isOpen])

  const socialLinks = [
    { icon: Github, href: "https://github.com/Reyystud", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/rafiandhi", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/rafiandhi_", label: "Instagram" },
    { icon: Mail, href: "mailto:your@email.com", label: "Email" },
  ]

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6"
    >
      {/* --- NAVBAR --- */}
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 flex flex-col items-center p-6 md:p-8"
      >
        <div className="w-full max-w-6xl flex justify-between items-center">
          {/* Logo atau Inisial (Opsional) */}
          <div className="text-primary font-bold text-xl tracking-tighter">R.</div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full border border-white/10 bg-background/50 backdrop-blur-md">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300">
                {item.label}
              </a>
            ))}
          </div>

          {/* Burger Button (Mobile Only) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-full border border-white/10 bg-background/50 backdrop-blur-md text-primary"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div 
          ref={menuRef}
          className="hidden w-full mt-4 overflow-hidden md:hidden"
        >
          <div className="flex flex-col items-center gap-6 py-8 rounded-3xl border border-white/10 bg-background/90 backdrop-blur-xl">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-sm tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="floating-element absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center pt-20">
        <div className="space-y-8 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-4">
            <h1 ref={nameRef} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
              Muhammad<br />
              <span className="text-primary">Rafiandhi</span><br />
              Suryadinata
            </h1>
            <p className="hero-text text-xl md:text-2xl text-primary font-medium">
              Computer Science Student @ ITB
            </p>
          </div>

          <p className="hero-text text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            I&apos;m a passionate developer who loves crafting digital experiences 
            that blend thoughtful design with robust engineering.
          </p>

          <div className="social-links flex items-center justify-center lg:justify-start gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} className="group p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300">
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        {/* PHOTO AREA */}
        <div ref={photoRef} className="relative flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-3xl rotate-6 scale-105" />
            <div className="absolute inset-0 border-2 border-white/10 rounded-3xl -rotate-3" />
            <div className="relative w-full h-full overflow-hidden rounded-3xl bg-card border border-border">
              <img src="/profile.jpeg" alt="Muhammad Rafiandhi" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* EXPLORE INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-1.5 h-6 rounded-full bg-primary/50 animate-pulse" />
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Explore</span>
      </div>
    </section>
  )
}