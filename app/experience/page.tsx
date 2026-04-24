"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, Briefcase, Award } from "lucide-react"
import Link from "next/link"
import { FadeInUp, BlurText, SlideIn } from "@/components/animations"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Startup Inc",
    period: "2023 - Present",
    description:
      "Leading the frontend development team in building scalable web applications. Responsible for architecture decisions and mentoring junior developers.",
    highlights: [
      "Implemented micro-frontend architecture reducing bundle size by 40%",
      "Led design system modernization affecting 50+ components",
      "Mentored 3 junior developers, leading to 2 promotions",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency",
    period: "2022 - 2023",
    description:
      "Developed full-stack solutions for various clients. Worked on everything from database design to UI implementation.",
    highlights: [
      "Built 10+ client projects using Next.js and Node.js",
      "Improved application performance by 60% through optimization",
      "Implemented CI/CD pipelines reducing deployment time by 70%",
    ],
  },
  {
    title: "Frontend Developer Intern",
    company: "Web Design Studio",
    period: "2021 - 2022",
    description:
      "Contributed to frontend development and UI/UX improvements. Gained experience with React and modern web technologies.",
    highlights: [
      "Built responsive landing pages for 5+ clients",
      "Implemented accessibility features across projects",
      "Participated in code reviews and best practices discussions",
    ],
  },
]

const education = [
  {
    degree: "Bachelor of Computer Science",
    school: "Institut Teknologi Bandung (ITB)",
    period: "2021 - Present",
    details: "Pursuing computer science with focus on software engineering and web development.",
  },
  {
    degree: "High School Diploma",
    school: "Indonesian High School",
    period: "2018 - 2021",
    details: "Graduated with honors, participated in programming competitions.",
  },
]

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
  },
  {
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
  },
  {
    title: "Advanced React Development",
    issuer: "Udemy",
    date: "2022",
  },
]

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-header",
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
            <div className="experience-header">
              <BlurText
                text="Experience & Education"
                className="text-5xl md:text-7xl font-bold mb-6"
              />
              <p className="text-xl text-muted-foreground max-w-3xl">
                A comprehensive overview of my professional journey, education, and achievements.
              </p>
            </div>

            {/* Work Experience */}
            <FadeInUp>
              <div>
                <div className="flex items-center gap-3 mb-12">
                  <Briefcase className="w-8 h-8 text-primary" />
                  <h2 className="text-4xl font-bold">Work Experience</h2>
                </div>

                <div className="space-y-8">
                  {experiences.map((exp, idx) => (
                    <FadeInUp key={exp.company} delay={idx * 0.15}>
                      <div className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors pb-8">
                        {/* Timeline dot */}
                        <div className="absolute -left-4 top-0 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary" />

                        <div className="p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary transition-colors">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-primary mb-2">
                                {exp.title}
                              </h3>
                              <p className="text-lg text-foreground mb-1">{exp.company}</p>
                              <p className="text-sm text-muted-foreground">{exp.period}</p>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {exp.description}
                          </p>

                          <div className="space-y-3">
                            <p className="font-semibold text-foreground">Key Achievements:</p>
                            <ul className="space-y-2">
                              {exp.highlights.map((highlight) => (
                                <li
                                  key={highlight}
                                  className="flex items-start gap-3 text-muted-foreground"
                                >
                                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </FadeInUp>
                  ))}
                </div>
              </div>
            </FadeInUp>

            {/* Education */}
            <FadeInUp>
              <div>
                <div className="flex items-center gap-3 mb-12">
                  <Award className="w-8 h-8 text-primary" />
                  <h2 className="text-4xl font-bold">Education</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {education.map((edu, idx) => (
                    <FadeInUp key={edu.school} delay={idx * 0.15}>
                      <div className="p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary transition-colors">
                        <h3 className="text-xl font-bold text-primary mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-foreground mb-1">{edu.school}</p>
                        <p className="text-sm text-muted-foreground mb-4">{edu.period}</p>
                        <p className="text-muted-foreground">{edu.details}</p>
                      </div>
                    </FadeInUp>
                  ))}
                </div>
              </div>
            </FadeInUp>

            {/* Certifications */}
            <FadeInUp>
              <div>
                <h2 className="text-4xl font-bold mb-12">Certifications</h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {certifications.map((cert, idx) => (
                    <FadeInUp key={cert.title} delay={idx * 0.15}>
                      <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary transition-colors text-center">
                        <Award className="w-8 h-8 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-foreground mb-2">{cert.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                        <p className="text-sm text-primary font-semibold">{cert.date}</p>
                      </div>
                    </FadeInUp>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </main>
  )
}
