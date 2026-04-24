"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FadeInUp, BlurText, NumberTicker, ScaleIn, SlideIn } from "@/components/animations"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"] },
  { category: "Tools", items: ["Git", "Docker", "Vercel", "AWS", "Figma"] },
]

const stats = [
  { label: "Projects Completed", value: 25, prefix: "" },
  { label: "Happy Clients", value: 12, prefix: "" },
  { label: "Years of Experience", value: 3, prefix: "" },
  { label: "Cups of Coffee", value: 500, prefix: "" },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-header",
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
          <div className="max-w-6xl mx-auto space-y-20">
            {/* Title Section */}
            <div className="about-header">
              <BlurText
                text="About Me"
                className="text-5xl md:text-7xl font-bold mb-6"
              />
              <p className="text-xl text-muted-foreground max-w-3xl">
                I&apos;m Muhammad Rafiandhi, a Computer Science student at ITB with
                a passion for building beautiful, functional digital experiences.
              </p>
            </div>

            {/* Story Section */}
            <FadeInUp>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <SlideIn direction="left">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">My Journey</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      I started my coding journey in high school, fascinated by the intersection
                      of design and engineering. Over the years, I&apos;ve developed a deep appreciation
                      for clean code, user-centered design, and the art of solving complex problems.
                    </p>
                    <p>
                      Currently, I&apos;m pursuing Computer Science at Institut Teknologi Bandung
                      while working on various projects that push the boundaries of web development.
                      I believe in continuous learning and staying updated with the latest technologies.
                    </p>
                    <p>
                      When I&apos;m not coding, you&apos;ll find me exploring new design trends, contributing
                      to open-source projects, or sharing my knowledge with the developer community.
                    </p>
                  </div>
                </div>
                </SlideIn>

                {/* Stats Grid */}
                <SlideIn direction="right">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, idx) => (
                    <FadeInUp key={stat.label} delay={idx * 0.1}>
                      <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary transition-colors">
                        <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                          <NumberTicker value={stat.value} prefix={stat.prefix} suffix="+" />
                        </div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </FadeInUp>
                  ))}
                </div>
                </SlideIn>
              </div>
            </FadeInUp>

            {/* Skills Section */}
            <FadeInUp>
              <div>
                <h2 className="text-4xl font-bold mb-12">Technical Skills</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {skills.map((skillGroup, idx) => (
                    <div
                      key={skillGroup.category}
                      className="p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary transition-colors"
                      style={{
                        animation: `fadeInUp 0.8s ease-out ${idx * 0.2}s both`,
                      }}
                    >
                      <h3 className="text-xl font-semibold mb-6 text-primary">
                        {skillGroup.category}
                      </h3>
                      <div className="space-y-3">
                        {skillGroup.items.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
                          >
                            <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>

            {/* Values Section */}
            <FadeInUp>
              <div>
                <h2 className="text-4xl font-bold mb-12">My Values</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 text-primary">Quality First</h3>
                    <p className="text-muted-foreground">
                      I believe in writing clean, maintainable code and creating experiences
                      that users genuinely enjoy. Details matter, and I obsess over them.
                    </p>
                  </div>
                  <div className="p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 text-primary">Continuous Growth</h3>
                    <p className="text-muted-foreground">
                      The tech industry evolves rapidly. I stay curious, learn new technologies,
                      and adapt to changing requirements with enthusiasm.
                    </p>
                  </div>
                  <div className="p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 text-primary">User Focus</h3>
                    <p className="text-muted-foreground">
                      Every decision is guided by what&apos;s best for users. From performance
                      to accessibility, I prioritize the end-user experience.
                    </p>
                  </div>
                  <div className="p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 text-primary">Collaboration</h3>
                    <p className="text-muted-foreground">
                      Great products come from great teams. I communicate clearly, share knowledge,
                      and lift up those around me.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
