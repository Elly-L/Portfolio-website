"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Brain, Shield, Cpu, Code, Database, Smartphone, Globe, Zap, Layers } from "lucide-react"

const services = [
  {
    title: "AI Solutions",
    description: "Cutting-edge artificial intelligence solutions tailored to your business needs.",
    icon: Brain,
  },
  {
    title: "Blockchain Development",
    description: "Secure and transparent blockchain implementations for various industries.",
    icon: Shield,
  },
  {
    title: "IoT Integration",
    description: "Seamless integration of Internet of Things devices and systems.",
    icon: Cpu,
  },
  {
    title: "Custom Software Development",
    description: "Bespoke software solutions designed to meet your specific requirements.",
    icon: Code,
  },
  {
    title: "Data Analytics",
    description: "Advanced data analytics and visualization to drive informed decision-making.",
    icon: Database,
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile applications for iOS and Android devices.",
    icon: Smartphone,
  },
  {
    title: "Web Development",
    description: "Responsive and dynamic web applications using the latest technologies.",
    icon: Globe,
  },
  {
    title: "Cloud Solutions",
    description: "Scalable and secure cloud infrastructure and migration services.",
    icon: Zap,
  },
  {
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your digital assets.",
    icon: Layers,
  },
]

export default function Services() {
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
          Our Services
        </motion.h1>

        <motion.p className="text-xl text-center text-muted-foreground mb-12" variants={itemVariants}>
          Innovative solutions to drive your business forward
        </motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <service.icon className="h-12 w-12 mb-4 text-primary" />
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
