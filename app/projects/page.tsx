"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Github, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FadeInUp, BlurText, ScaleIn } from "@/components/animations"

gsap.registerPlugin(ScrollTrigger)

const projectsData = [
  {
    id: 1,
    title: "AI Chat Application",
    description:
      "A modern chat application powered by AI, featuring real-time conversations, context awareness, and a beautiful user interface. Built with cutting-edge technologies to ensure seamless performance.",
    longDescription:
      "This project demonstrates advanced state management, real-time data synchronization, and AI integration. The application features message persistence, user authentication, and typing indicators.",
    image: "/projects/ai-chat.jpg",
    techs: ["Next.js", "OpenAI", "Prisma", "PostgreSQL", "WebSocket"],
    github: "#",
    live: "#",
    featured: true,
    year: 2024,
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with payment integration, inventory management, and responsive design. Handles thousands of products and concurrent users.",
    longDescription:
      "A comprehensive e-commerce platform with product filtering, shopping cart functionality, secure payment processing via Stripe, order tracking, and an admin dashboard for inventory management.",
    image: "/projects/ecommerce.jpg",
    techs: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    github: "#",
    live: "#",
    featured: true,
    year: 2024,
  },
  {
    id: 3,
    title: "Portfolio Generator",
    description:
      "A tool that helps developers create stunning portfolio websites with minimal configuration. Drag-and-drop interface with customizable templates.",
    longDescription:
      "An all-in-one portfolio creation tool that allows developers to build professional portfolios without coding. Features template selection, content management, and one-click deployment.",
    image: "/projects/portfolio.jpg",
    techs: ["TypeScript", "Tailwind CSS", "Vercel", "Next.js"],
    github: "#",
    live: "#",
    featured: false,
    year: 2023,
  },
  {
    id: 4,
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team features, and productivity analytics. Perfect for agile teams.",
    longDescription:
      "A powerful task management solution with team collaboration, real-time updates, recurring tasks, progress tracking, and insightful analytics to boost team productivity.",
    image: "/projects/taskmanager.jpg",
    techs: ["Vue.js", "Firebase", "Vuetify", "Chart.js"],
    github: "#",
    live: "#",
    featured: false,
    year: 2023,
  },
  {
    id: 5,
    title: "Design System Components",
    description:
      "Reusable component library with 50+ animated components, accessibility features, and comprehensive documentation.",
    longDescription:
      "A design system package that provides production-ready components with built-in animations, keyboard navigation, and ARIA attributes. Fully documented with Storybook.",
    image: "/projects/design.jpg",
    techs: ["React", "TypeScript", "Storybook", "Chromatic"],
    github: "#",
    live: "#",
    featured: false,
    year: 2023,
  },
]

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Fixed noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div ref={containerRef} className="relative z-10">
        {/* Header with back button */}
        <header className="fixed top-0 left-0 w-full z-40 p-6 md:p-8 bg-background/50 backdrop-blur-md border-b border-border">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </header>

        {/* Page content */}
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Title Section */}
            <div className="projects-header mb-20">
              <BlurText
                text="All Projects"
                className="text-5xl md:text-7xl font-bold mb-6"
              />
              <p className="text-xl text-muted-foreground max-w-2xl">
                A collection of projects showcasing my skills in full-stack development,
                UI/UX design, and innovative problem-solving.
              </p>
            </div>

            {/* Featured Projects Grid */}
            <div className="mb-24">
              <h2 className="text-3xl font-bold mb-12">Featured Works</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {projectsData
                  .filter((p) => p.featured)
                  .map((project, idx) => (
                    <FadeInUp key={project.id} delay={idx * 0.2}>
                      <div
                        className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-500 cursor-pointer"
                        onMouseEnter={() => setHoveredId(project.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        {/* Image area */}
                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary to-background">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-32 h-32">
                              <div className="absolute inset-0 rounded-2xl bg-primary/20 transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                              <div className="absolute inset-2 rounded-xl bg-primary/10 transform -rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                            </div>
                          </div>

                          {/* Hover overlay */}
                          <div
                            className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
                              hoveredId === project.id ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            <a
                              href={project.github}
                              className="p-3 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all"
                              aria-label="View GitHub"
                            >
                              <Github className="w-5 h-5" />
                            </a>
                            <a
                              href={project.live}
                              className="p-3 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all"
                              aria-label="View Live"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {project.year}
                            </span>
                          </div>
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

                        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </FadeInUp>
                  ))}
              </div>
            </div>

            {/* All Projects Grid */}
            <div>
              <h2 className="text-3xl font-bold mb-12">Other Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData
                  .filter((p) => !p.featured)
                  .map((project, idx) => (
                    <ScaleIn key={project.id} delay={idx * 0.15} trigger={idx % 2 === 0}>
                      <div
                        className="group relative overflow-hidden rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary transition-all duration-300 p-6"
                        onMouseEnter={() => setHoveredId(project.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {project.year}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.techs.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground border border-border/50"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2 pt-4">
                            <a
                              href={project.github}
                              className="p-2 rounded-lg bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all"
                              aria-label="GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                            <a
                              href={project.live}
                              className="p-2 rounded-lg bg-secondary hover:bg-primary/20 border border-border hover:border-primary transition-all"
                              aria-label="Live"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </ScaleIn>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
