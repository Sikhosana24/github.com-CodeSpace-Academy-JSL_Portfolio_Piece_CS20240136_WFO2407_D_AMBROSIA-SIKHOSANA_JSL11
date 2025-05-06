import { Code, Palette, Layout, Braces } from "lucide-react"
import AnimateInView from "./animate-in-view"

export default function SkillsSection() {
  const skills = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "HTML",
      description: "Semantic markup, accessibility, and modern HTML5 features for structured content.",
      delay: 100,
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "CSS",
      description: "Responsive design, animations, Flexbox, Grid, and CSS preprocessors like Sass.",
      delay: 200,
    },
    {
      icon: <Braces className="h-10 w-10 text-primary" />,
      title: "JavaScript",
      description: "ES6+, DOM manipulation, async programming, and modern JavaScript practices.",
      delay: 300,
    },
    {
      icon: <Layout className="h-10 w-10 text-primary" />,
      title: "React",
      description: "Component-based architecture, hooks, state management, and React ecosystem tools.",
      delay: 400,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900" id="skills">
      <div className="container px-4 md:px-6">
        <AnimateInView>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Skills</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I specialize in these technologies to build modern web applications.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl">
              {skills.map((skill, index) => (
                <AnimateInView key={skill.title} delay={skill.delay} direction="up">
                  <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    <div className="p-3 rounded-full bg-primary/10">{skill.icon}</div>
                    <h3 className="text-xl font-bold">{skill.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{skill.description}</p>
                  </div>
                </AnimateInView>
              ))}
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
