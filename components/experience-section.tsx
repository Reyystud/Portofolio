"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    period: "2026 — Present",
    title: "Robotic Software Control",
    company: "Aksantara ITB",
    logo: "aksantaraitb_logo.jpeg",
    description:
      "Building web applications and contributing to various campus projects. Developing skills in full-stack development while maintaining excellent academic performance.",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "GO"],
    link: "#",
  },
  {
    period: "2026 — Present",
    title: "Backend Engineer",
    company: "Wisuda April ITB 2026",
    logo: "wispril.jpg",
    description:
      "Helping fellow students understand programming concepts and assisting in lab sessions. Creating educational materials and providing hands-on guidance.",
    skills: ["Hono", "TypeScript", "Git", "Prisma"],
    link: "#",
  },
  {
    period: "2025 — Present",
    title: "Fullstack Engineer",
    company: "Bloca Company",
    logo: "bloca.jpeg",
    description:
      "Built and maintained an e-commerce website for bracelet products by implementing both front-end and back-end features, including product catalog, user interaction, and transaction handling.",
    skills: ["Web Design", "React", "Tailwind CSS", "SEO"],
    link: "#",
  },
  {
    period: "2025 — Present",
    title: "Event Organizer",
    company: "TEDxITB 9.0",
    logo: "tedx.png",
    description:
      "Coordinate and execute event planning activities, including logistics, scheduling, and team collaboration to ensure a smooth and impactful TEDx event experience.",
    skills: ["Event Planning", "Team Coordination", "Time Management", "Problem Solving"],
    link: "#",
  },
  {
    period: "2025 — 2025",
    title: "Growth Hacker",
    company: "aimasukptn.com",
    logo: "aimasukptn.png",
    description:
      "Design and execute data-driven growth strategies to increase user acquisition, engagement, and retention through rapid experimentation, analytics, and product optimization.",
    skills: ["Data Analysis", "A/B Testing & Experimentation", "Growth Strategy", "Funnel Optimization"],
    link: "#",
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Experience items animation
      const items = itemsRef.current?.children
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: itemsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Timeline line animation
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold mb-16 uppercase tracking-tighter"
        >
          Experience
        </h2>

        <div ref={itemsRef} className="relative">
          {/* Timeline line */}
          <div className="timeline-line absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top hidden md:block" />

          {experiences.map((exp, index) => (
            <div key={index} className="group relative pl-0 md:pl-8 pb-12 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 hidden md:flex">
                <div className="w-2 h-2 -ml-[4.5px] rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
              </div>

              <div className="grid md:grid-cols-[160px_1fr] gap-8 md:gap-12 p-8 rounded-[2rem] hover:bg-card/50 transition-all duration-500 border border-transparent hover:border-border/50">
                
                <div className="flex flex-col items-start justify-start pt-1">
                  <div className="relative aspect-square w-full max-w-[140px] rounded-2xl bg-muted/20 border border-border overflow-hidden flex items-center justify-center p-4 group-hover:border-primary/40 group-hover:bg-muted/40 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/5">
                    <img 
                      src={exp.logo} 
                      alt={exp.company} 
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* --- KOLOM KANAN: DETAIL & TAHUN --- */}
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                        {exp.title}
                      </h3>
        
                      <div className="inline-block text-[15px] font-bold tracking-[0.2em] text-muted-foreground px-3 py-1 uppercase">
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-primary font-semibold text-lg">{exp.company}</p>
                  </div>

                  <a
                    href={exp.link}
                    className="inline-flex p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all md:opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                    aria-label={`View ${exp.company}`}
                  >
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  </a>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                  {exp.description}
                </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-1.5 text-xs font-medium rounded-lg bg-secondary/50 text-secondary-foreground border border-border group-hover:border-primary/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}