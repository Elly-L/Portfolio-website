"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Brain, Shield, Cpu } from "lucide-react"
import { TypingAnimation } from "@/components/typing-animation"
import { useState, useEffect } from "react"

const partners = [
  {
    name: "Kiwaru",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kiwaru.jpg-gfOqmara9sCZaLiILjvJZThaM6ImOT.jpeg",
    description: "Innovation Partner",
  },
  {
    name: "CMK Solutions",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rqCwrpHhOfrC1QaGjpajEMSneCg7IE.png",
    description: "Technology Partner",
  },
  {
    name: "GreenchainCredit",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3nbXisogEG52Wb4Y8AWj90J8KrgGhM.png",
    description: "Sustainability Partner",
  },
  {
    name: "TechVentures",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aSF6MJyrIFnv3CKXi13Hn6NOdHDgfR.png",
    description: "Strategic Partner",
  },
]

const testimonials = [
  {
    name: "Dr. Abbey Mwihaki",
    position: "Oncologist, Kenya",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abbey.jpg-nVtNLomF0wKc8uaWR3AYW6qONkASMa.jpeg",
    testimonial:
      "EltekAI's contribution to cancer research has been groundbreaking. Their AI solutions have significantly accelerated our data analysis process, helping us identify patterns in patient responses to treatments that we might have otherwise missed. This technology is revolutionizing how we approach cancer research in Kenya.",
  },
  {
    name: "Ian Kahuria",
    position: "Founder, Kiwaru",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kay.jpg-mQ5S3wQPKuIcSDne8adUtSQuogUCXD.jpeg",
    testimonial:
      "Integrating El~Tek's AI solutions into our e-commerce platform has transformed how we approach potato value chain management in Kenya. The predictive analytics and supply chain optimization have helped farmers increase their yields and profits while ensuring consumers get the best quality produce.",
  },
  {
    name: "Chris Munene",
    position: "Founder, CMK Solutions",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chris.jpg-j1iu0mdcutS50sSBIAaAuFwzVdRiu6.jpeg",
    testimonial:
      "As an IT service provider, partnering with El~Tek has been transformative. Their AI integration capabilities have enabled us to offer more intelligent, automated solutions to our clients. The efficiency gains and problem-solving capabilities of their AI systems have exceeded our expectations.",
  },
]

const projects = [
  {
    title: "NGAO",
    description:
      "An advanced verification platform that helps distinguish authentic content from AI-generated misinformation.",
    url: "https://ngao.netlify.app/",
    image: "/images/ngao-screenshot.png",
  },
  {
    title: "ShilingiX",
    description:
      "A Web3 micro-investment platform enabling investments in tokenized securities with as little as KES 50.",
    url: "https://shilingix.netlify.app/",
    image: "/images/shilingix-screenshot.png",
  },
  {
    title: "Joslo",
    description:
      "Natural herbal solutions platform offering premium products that harness the healing power of nature.",
    url: "https://joslo.netlify.app",
    image: "/images/joslo-screenshot.png",
  },
  {
    title: "Boots & Backpacks",
    description: "An adventure community connecting outdoor enthusiasts to explore breathtaking landscapes together.",
    url: "https://boots-backpacks.netlify.app",
    image:
      "https://sjc.microlink.io/lquyRZY2JOyxEz8_QgofB4x6hdHiF4WOY8gcZtO3rUz8nipYMVq132plrmhVQpwLnspzEPJBad-7M4zNaCKcXw.jpeg",
  },
  {
    title: "EltekAI",
    description:
      "An advanced AI platform that transforms research papers into engaging presentations, podcasts, and visual content.",
    url: "https://eltekai.netlify.app/",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eRbgmBXlCnyPgb422mXW2DgHRYyHpL.png",
  },
  {
    title: "BomaVerse",
    description: "A revolutionary blockchain-based platform for real estate transactions.",
    url: "https://bomaverse.netlify.app",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EnpzVuwcEh9Y2rijgMSbx5QX6FlD7o.png",
  },
  {
    title: "Game Logania",
    description: "An immersive fantasy game platform exploring enchanted realms of ancient lore and magical wonder.",
    url: "https://logania.netlify.app",
    image:
      "https://sjc.microlink.io/k0cTf_FcZjYOINIesEZB9_B1Zv55EdCnDMHWo-X2X6myKHjouCLPtXgMvGzArvnSx6o-AnkjXBM1TKbJ_6aAew.jpeg",
  },
  {
    title: "SkillsSync AI",
    description:
      "An AI-powered HR platform that helps companies upskill and redeploy talent instead of replacing them.",
    url: "https://skillssync-ai.netlify.app/",
    image: "/images/skillssync-screenshot.jpeg",
  },
  {
    title: "Herina Events & Decor",
    description:
      "A premium catering and events company specializing in culinary excellence and exquisite event services.",
    url: "https://herina.netlify.app/",
    image: "/images/herina-screenshot.png",
  },
]

export default function Home() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    // Check if it's a low-end device
    const isLowRes = window.matchMedia("(max-resolution: 1dppx)").matches
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches
    setIsLowEndDevice(isLowRes && isSmallScreen)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-2xl md:text-4xl font-bold mb-4 ${isLowEndDevice ? "text-primary" : "gradient-text"}`}
          >
            Hakuna Matata
          </motion.h2>
          <motion.div variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6">
            <TypingAnimation text="Innovating the Future of Technology" />
          </motion.div>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto">
            A tech startup revolutionizing the AI & Blockchain space with cutting-edge solutions
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition duration-150 ease-in-out"
            >
              Explore Our Projects
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className={`text-3xl md:text-4xl font-bold mb-4 ${isLowEndDevice ? "text-primary" : "gradient-text"}`}
            >
              Why Choose Eltek?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground">
              We combine innovation with expertise to deliver exceptional solutions
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-card shadow-lg"
            >
              <Brain className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">AI Excellence</h3>
              <p className="text-muted-foreground">
                Cutting-edge artificial intelligence solutions that transform businesses
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-card shadow-lg"
            >
              <Shield className="h-12 w-12 mb-4 text-secondary" />
              <h3 className="text-xl font-bold mb-2">Blockchain Security</h3>
              <p className="text-muted-foreground">
                Robust and secure blockchain implementations for various industries
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-card shadow-lg"
            >
              <Cpu className="h-12 w-12 mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Innovation First</h3>
              <p className="text-muted-foreground">Always at the forefront of technological advancement</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className={`text-3xl md:text-4xl font-bold mb-4 ${isLowEndDevice ? "text-primary" : "gradient-text"}`}
            >
              Our Trusted Partners
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground">
              Collaborating with industry leaders to drive innovation
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20" variants={containerVariants}>
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-card p-6 rounded-lg shadow-lg"
              >
                <div className="aspect-square relative mb-4 overflow-hidden">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain p-4 hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className={`font-bold text-lg mb-1 ${isLowEndDevice ? "text-primary" : "gradient-text"}`}>
                  {partner.name}
                </h3>
                <p className="text-sm text-muted-foreground">{partner.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isLowEndDevice ? "text-primary" : "gradient-text"}`}
          >
            Client Testimonials
          </motion.h2>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-card p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className={`font-bold ${isLowEndDevice ? "text-primary" : "gradient-text"}`}>
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">"{testimonial.testimonial}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
