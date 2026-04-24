"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BlurText, NumberTicker, FadeInUp, RotatingBorder, WordRotate, SlideIn, ScaleIn } from "@/components/animations"

export default function AnimationsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".animations-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const animationExamples = [
    {
      name: "Blur Text",
      description: "Text animates in with a blur effect",
      component: <BlurText text="Beautiful Animations" className="text-2xl font-bold text-primary" />,
    },
    {
      name: "Number Ticker",
      description: "Numbers animate up to a target value",
      component: <NumberTicker value={100} duration={2} className="text-4xl font-bold text-primary" prefix="$" />,
    },
    {
      name: "Fade In Up",
      description: "Elements fade in and slide up on scroll",
      component: (
        <FadeInUp trigger={false}>
          <div className="p-6 rounded-lg bg-primary/20 border border-primary/50 text-center">
            Faded in and slid up smoothly
          </div>
        </FadeInUp>
      ),
    },
    {
      name: "Rotating Border",
      description: "A card with a spinning gradient border",
      component: (
        <RotatingBorder speed={15}>
          <div className="text-center">
            <p className="text-primary font-bold">Rotating Border</p>
            <p className="text-sm text-muted-foreground mt-2">Subtle continuous animation</p>
          </div>
        </RotatingBorder>
      ),
    },
    {
      name: "Word Rotate",
      description: "Words rotate in and out",
      component: (
        <div className="text-3xl font-bold text-primary">
          I love{" "}
          <WordRotate
            words={["React", "Next.js", "Tailwind", "Animations"]}
            duration={2}
            className="inline-block"
          />
        </div>
      ),
    },
    {
      name: "Slide In",
      description: "Elements slide in from different directions",
      component: (
        <SlideIn direction="left" trigger={false}>
          <div className="p-6 rounded-lg bg-secondary/50 border border-border text-center">
            Slid in from the left
          </div>
        </SlideIn>
      ),
    },
    {
      name: "Scale In",
      description: "Elements scale up as they appear",
      component: (
        <ScaleIn trigger={false}>
          <div className="p-6 rounded-lg bg-accent/20 border border-accent/50 text-center">
            Scaled up smoothly
          </div>
        </ScaleIn>
      ),
    },
  ]

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
            <div className="animations-header">
              <BlurText
                text="Animation Showcase"
                className="text-5xl md:text-7xl font-bold mb-6"
              />
              <p className="text-xl text-muted-foreground max-w-3xl">
                A collection of smooth, beautiful animations created with GSAP and custom React components.
                These animations enhance user experience and create memorable interactions.
              </p>
            </div>

            {/* Animations Grid */}
            <FadeInUp>
              <div className="grid md:grid-cols-2 gap-8">
                {animationExamples.map((example, idx) => (
                  <FadeInUp key={example.name} delay={idx * 0.1}>
                    <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary transition-all duration-300 space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">
                          {example.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {example.description}
                        </p>
                      </div>

                      <div className="p-6 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center min-h-24">
                        {example.component}
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </FadeInUp>

            {/* Implementation Guide */}
            <FadeInUp>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">How to Use</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-4 text-primary">Installation</h3>
                    <p className="text-muted-foreground mb-4">
                      All animations are built with GSAP and React. Import the animation components directly:
                    </p>
                    <code className="block p-3 rounded bg-background/50 text-sm text-primary overflow-x-auto">
                      {`import { BlurText, FadeInUp } from "@/components/animations"`}
                    </code>
                  </div>

                  <div className="p-8 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-4 text-primary">Usage Example</h3>
                    <code className="block p-3 rounded bg-background/50 text-sm text-primary overflow-x-auto text-xs">
                      {`<BlurText\n  text="Hello"\n  duration={0.8}\n/>`}
                    </code>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Benefits Section */}
            <FadeInUp>
              <div>
                <h2 className="text-4xl font-bold mb-12">Why These Animations?</h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Enhanced UX",
                      description: "Smooth animations guide user attention and create delightful interactions.",
                    },
                    {
                      title: "Performance",
                      description: "Built with GSAP for hardware-accelerated animations that run smoothly.",
                    },
                    {
                      title: "Reusable",
                      description: "Easily customizable components you can use throughout your application.",
                    },
                  ].map((benefit) => (
                    <div
                      key={benefit.title}
                      className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary transition-colors"
                    >
                      <h3 className="font-bold text-primary mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
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
