"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import AnimateInView from "./animate-in-view"

export default function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // This is a placeholder for your actual form submission logic
    // You would typically send this data to a server or API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      })

      // Reset form
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900" id="contact">
      <div className="container px-4 md:px-6">
        <AnimateInView>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Have a project in mind or want to chat? Send me a message!
              </p>
            </div>
            <div className="w-full max-w-md space-y-4">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <AnimateInView delay={100} direction="right">
                  <div className="space-y-2">
                    <Input
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </AnimateInView>
                <AnimateInView delay={200} direction="right">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </AnimateInView>
                <AnimateInView delay={300} direction="right">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[120px] transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </AnimateInView>
                <AnimateInView delay={400} direction="up">
                  <Button
                    type="submit"
                    className="w-full transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending...</span>
                        <Send className="h-4 w-4 animate-pulse" />
                      </>
                    ) : (
                      <>
                        <span className="mr-2">Send Message</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </AnimateInView>
              </form>
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Or email me directly at:{" "}
                  <a
                    href="mailto:your.email@example.com"
                    className="text-primary hover:underline transition-all duration-300"
                  >
                    your.email@example.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
