"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Github, Loader2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimateInView from "./animate-in-view"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  topics: string[]
  language: string
}

export default function ProjectsSection() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Replace 'yourusername' with your actual GitHub username
        const response = await fetch("https://api.github.com/users/yourusername/repos?sort=updated&per_page=6")

        if (!response.ok) {
          throw new Error("Failed to fetch repositories")
        }

        const data = await response.json()
        setRepos(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load projects. Please try again later.")
        setLoading(false)
        console.error("Error fetching GitHub repos:", err)
      }
    }

    fetchRepos()
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="projects">
      <div className="container px-4 md:px-6">
        <AnimateInView>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out some of my recent work from GitHub.
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center w-full py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading projects...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 py-8">
                {error}
                <div className="mt-4">
                  <Button asChild>
                    <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Visit My GitHub Profile
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
                {repos.map((repo, index) => (
                  <AnimateInView key={repo.id} delay={index * 100} direction="up">
                    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <CardHeader>
                        <CardTitle>{repo.name}</CardTitle>
                        <CardDescription>
                          {repo.language && (
                            <Badge variant="outline" className="mr-2">
                              {repo.language}
                            </Badge>
                          )}
                          {repo.topics &&
                            repo.topics.slice(0, 2).map((topic) => (
                              <Badge key={topic} variant="secondary" className="mr-1">
                                {topic}
                              </Badge>
                            ))}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {repo.description || "No description available"}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="transition-all duration-300 hover:bg-primary/10"
                        >
                          <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </Link>
                        </Button>
                        {repo.homepage && (
                          <Button size="sm" asChild className="transition-all duration-300 hover:bg-primary/90">
                            <Link href={repo.homepage} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Demo
                            </Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </AnimateInView>
                ))}
              </div>
            )}

            <AnimateInView delay={300}>
              <div className="mt-8">
                <Button asChild className="transition-all duration-300 hover:bg-primary/90 hover:scale-105">
                  <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View More on GitHub
                  </Link>
                </Button>
              </div>
            </AnimateInView>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
