"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, Palette, Lightbulb, Rocket } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    icon: Code2,
    title: "Development",
    description: "Building scalable applications with modern technologies",
    techs: ["React", "Next.js", "TypeScript", "Python"],
  },
  {
    icon: Palette,
    title: "Design",
    description: "Creating beautiful and intuitive user interfaces",
    techs: ["Figma", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Analytical thinking and algorithmic solutions",
    techs: ["Data Structures", "Algorithms", "System Design"],
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Exploring new technologies and building creative projects",
    techs: ["Machine Learning", "Cloud Computing", "DevOps"],
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

      // Cards stagger animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Card hover effects
      const cardElements = document.querySelectorAll(".skill-card")
      cardElements.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(card.querySelector(".card-glow"), {
            opacity: 1,
            duration: 0.3,
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(card.querySelector(".card-glow"), {
            opacity: 0,
            duration: 0.3,
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 bg-background"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
            As a Computer Science student at Institut Teknologi Bandung, I combine 
            academic knowledge with practical experience to build meaningful digital 
            solutions. I believe in continuous learning and pushing the boundaries 
            of what&apos;s possible with technology.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6"
        >
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="skill-card relative group p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden cursor-pointer"
            >
              {/* Glow effect */}
              <div className="card-glow absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {skill.title}
                  </h3>
                </div>

                <p className="text-muted-foreground mb-6">
                  {skill.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {skill.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
