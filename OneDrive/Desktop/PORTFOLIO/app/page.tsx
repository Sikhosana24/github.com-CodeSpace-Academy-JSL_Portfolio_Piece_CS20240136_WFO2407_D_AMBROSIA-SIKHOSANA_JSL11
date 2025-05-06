import { Github, Mail, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"
import { Button } from "@/components/ui/button"
import AnimateInView from "@/components/animate-in-view"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <AnimateInView direction="left">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Hi, I'm <span className="text-primary">Your Name</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    A passionate web developer specializing in HTML, CSS, JavaScript, and React. I build responsive,
                    accessible, and performant web applications.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild className="transition-all duration-300 hover:bg-primary/90 hover:scale-105">
                    <Link href="#projects">View My Projects</Link>
                  </Button>
                  <Button variant="outline" asChild className="transition-all duration-300 hover:bg-primary/10">
                    <Link href="#contact">Contact Me</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="transition-all duration-300 hover:scale-110 hover:bg-primary/10"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="transition-all duration-300 hover:scale-110 hover:bg-primary/10"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href="mailto:your.email@example.com">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="transition-all duration-300 hover:scale-110 hover:bg-primary/10"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimateInView>
            <AnimateInView direction="right" delay={300}>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] overflow-hidden rounded-full border-4 border-primary animate-pulse-slow">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Profile"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    priority
                  />
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32" id="about">
        <div className="container px-4 md:px-6">
          <AnimateInView>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  I'm a web developer with a passion for creating beautiful, functional, and user-friendly websites.
                  With expertise in HTML, CSS, JavaScript, and React, I specialize in building responsive web
                  applications that provide exceptional user experiences.
                </p>
              </div>
              <div className="w-full max-w-full space-y-4">
                <AnimateInView delay={200} direction="up">
                  <p className="text-gray-500 dark:text-gray-400">
                    My journey in web development began with HTML and CSS, and I quickly expanded my skills to include
                    JavaScript and modern frameworks like React. I'm constantly learning and exploring new technologies
                    to stay at the forefront of web development.
                  </p>
                </AnimateInView>
                <AnimateInView delay={400} direction="up">
                  <p className="text-gray-500 dark:text-gray-400">
                    When I'm not coding, you can find me [your hobbies/interests]. I believe that a well-rounded
                    perspective helps me create better solutions for the web.
                  </p>
                </AnimateInView>
              </div>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}
