"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Github, Linkedin, Mail, Instagram } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in Navbar
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
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 flex justify-center p-8"
      >
        <div className="flex items-center gap-8 px-8 py-3 rounded-full border border-white/10 bg-background/50 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="floating-element absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center pt-20">
        
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <h1
              ref={nameRef}
              className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Muhammad<br />
              <span className="text-primary">Rafiandhi</span><br />
              Suryadinata
            </h1>
            <p className="hero-text text-xl md:text-2xl text-primary font-medium">
              Computer Science Student @ ITB
            </p>
          </div>

          <p className="hero-text text-muted-foreground text-lg leading-relaxed max-w-xl">
            I&apos;m a passionate developer who loves crafting digital experiences 
            that blend thoughtful design with robust engineering. Currently exploring 
            <span className="text-primary"> web development</span> and 
            <span className="text-primary"> software engineering</span>.
          </p>

          <div className="social-links flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>

        <div ref={photoRef} className="relative flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-3xl rotate-6 scale-105" />
            <div className="absolute inset-0 border-2 border-white/10 rounded-3xl -rotate-3" />
            
            <div className="relative w-full h-full overflow-hidden rounded-3xl bg-card border border-border">
              <img 
                src="/profile.jpeg"
                alt="Muhammad Rafiandhi"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-1.5 h-6 rounded-full bg-primary/50 animate-pulse" />
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Explore</span>
      </div>
    </section>
  )
}