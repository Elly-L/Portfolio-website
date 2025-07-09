"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Phone, Mail, MapPin, Send, Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "What is blockchain technology and how does it work?",
    answer:
      "Blockchain is a decentralized digital ledger that records transactions across a network of computers. It creates an immutable record of data that is transparent and secure. Each block contains transaction data and is linked to previous blocks, forming a chain of information that cannot be altered without changing all subsequent blocks.",
  },
  {
    question: "How is AI transforming business operations?",
    answer:
      "AI is revolutionizing businesses through automation, data analysis, and predictive capabilities. It helps companies make better decisions, improve customer service through chatbots, optimize operations, and identify market trends. AI can process vast amounts of data quickly and accurately, leading to improved efficiency and innovation.",
  },
  {
    question: "What are the benefits of combining AI and blockchain?",
    answer:
      "Combining AI and blockchain creates powerful synergies. AI can analyze blockchain data to identify patterns and make predictions, while blockchain provides secure and transparent data storage for AI algorithms. This combination enhances security, improves decision-making, and enables new applications in areas like supply chain management and financial services.",
  },
  {
    question: "How secure are blockchain transactions?",
    answer:
      "Blockchain transactions are highly secure due to cryptographic techniques, decentralized nature, and consensus mechanisms. Each transaction is verified by multiple nodes in the network, making it extremely difficult to alter or hack. The immutable nature of blockchain ensures that once a transaction is recorded, it cannot be changed.",
  },
  {
    question: "What industries can benefit from AI and blockchain solutions?",
    answer:
      "Nearly every industry can benefit from these technologies. Healthcare can use them for secure patient records and diagnosis, finance for secure transactions and fraud detection, supply chain for tracking and verification, real estate for property records and smart contracts, and manufacturing for quality control and process optimization.",
  },
]

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={containerVariants}>
        <motion.h1 className="text-4xl font-bold mb-8 text-center gradient-text" variants={itemVariants}>
          Get in Touch
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+254719338534" className="text-muted-foreground hover:text-primary">
                      +254 719 338 534
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:eltekinc@gmail.com" className="text-muted-foreground hover:text-primary">
                      eltekinc@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-background"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-background"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-background"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Send Message
                  <Send className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQ key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-primary flex-shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-primary flex-shrink-0" />
        )}
      </button>
      {isOpen && <div className="px-6 pb-4 text-muted-foreground">{answer}</div>}
    </div>
  )
}
