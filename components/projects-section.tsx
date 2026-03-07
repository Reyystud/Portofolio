"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "AI Chat Application",
    description:
      "A modern chat application powered by AI, featuring real-time conversations, context awareness, and a beautiful user interface.",
    image: "/projects/ai-chat.jpg",
    techs: ["Next.js", "OpenAI", "Prisma", "PostgreSQL"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with payment integration, inventory management, and responsive design.",
    image: "/projects/ecommerce.jpg",
    techs: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Portfolio Generator",
    description:
      "A tool that helps developers create stunning portfolio websites with minimal configuration.",
    image: "/projects/portfolio.jpg",
    techs: ["TypeScript", "Tailwind CSS", "Vercel"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team features, and productivity analytics.",
    image: "/projects/taskmanager.jpg",
    techs: ["Vue.js", "Firebase", "Vuetify"],
    github: "#",
    live: "#",
    featured: false,
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

      // Projects grid animation
      const projectCards = projectsRef.current?.querySelectorAll(".project-card")
      if (projectCards) {
        gsap.fromTo(
          projectCards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 bg-background"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Featured <span className="text-primary">Projects</span>
          </h2>
          <a
            href="#"
            className="group hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div
          ref={projectsRef}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 ${
                project.featured ? "md:col-span-1" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image placeholder with gradient */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary to-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]" />
                
                {/* Abstract decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                    <div className="absolute inset-2 rounded-xl bg-primary/10 transform -rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="absolute inset-4 rounded-lg bg-primary/5 transform rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
                  </div>
                </div>

                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <a
                    href={project.github}
                    className="p-3 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all"
                    aria-label="View GitHub"
                  >
                    <Github className="w-5 h-5 text-foreground" />
                  </a>
                  <a
                    href={project.live}
                    className="p-3 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all"
                    aria-label="View Live"
                  >
                    <ExternalLink className="w-5 h-5 text-foreground" />
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner glow */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        <a
          href="#"
          className="group flex md:hidden items-center justify-center gap-2 mt-8 text-muted-foreground hover:text-primary transition-colors"
        >
          View all projects
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  )
}
