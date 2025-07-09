"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { useState, useEffect } from "react"

const stats = [
  { label: "Clients Served", value: 150, suffix: "+" },
  { label: "Projects Completed", value: 200, suffix: "+" },
  { label: "Revenue Generated", value: 2, prefix: "$", suffix: "M+" },
  { label: "Team Members", value: 25, suffix: "+" },
]

function AnimatedCounter({ value, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  useEffect(() => {
    if (inView) {
      let start = 0
      const end = Number.parseInt(value)
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start > end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [value, inView])

  return (
    <span ref={ref} className="text-4xl font-bold gradient-text">
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={containerVariants}>
        <motion.h1 className="text-4xl font-bold mb-8 text-center gradient-text" variants={itemVariants}>
          About Eltek
        </motion.h1>

        <motion.div className="flex flex-col md:flex-row items-center mb-16" variants={itemVariants}>
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="relative w-64 h-64 mx-auto">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ME.jpg-XN7fzPr3qmpjQrx8K9H2ysstbTNCgl.jpeg"
                alt="Elly Logan Odhiambo"
                fill
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Elly Logan Odhiambo</h2>
            <h3 className="text-xl text-muted-foreground mb-4">CEO & Founder</h3>
            <p className="text-lg mb-4">
              A visionary tech entrepreneur with a passion for artificial intelligence and blockchain technology.
              Leading Eltek in creating innovative solutions that address complex challenges in the modern digital
              landscape.
            </p>
            <p className="text-lg mb-6">
              With expertise in AI and blockchain development, Elly has guided Eltek to become a pioneer in creating
              cutting-edge solutions that combine both technologies for maximum impact.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary"
              >
                <Github size={24} />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary"
              >
                <Linkedin size={24} />
              </a>
              <a href="mailto:eltekinc@gmail.com" className="text-foreground hover:text-primary">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-4 gradient-text">Our Vision</h2>
          <p className="text-lg mb-4">
            At Eltek, we envision a world where technology seamlessly integrates into every aspect of our lives,
            enhancing efficiency, sustainability, and human potential. Our commitment to innovation drives us to create
            solutions that not only solve today's challenges but also anticipate tomorrow's needs.
          </p>
          <p className="text-lg">
            Through our expertise in AI and blockchain technology, we're building a future where businesses and
            communities can thrive in the digital age.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-card p-6 rounded-lg shadow-lg text-center">
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
