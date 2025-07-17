"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"

const projects = [
  {
    id: 15,
    title: "AbiCare AI",
    description:
      "Your Intelligent Health Companion - a symptom-based checker providing friendly, concise diagnostic suggestions and gentle guidance based on your symptoms, powered by advanced AI. It serves as a private health companion, always there to listen.",
    image: "/images/abicare-ai-screenshot.png",
    category: "AI",
    technologies: ["AI", "Machine Learning", "Natural Language Processing", "Web Development"],
    challenges:
      "Developing highly accurate AI models for symptom analysis and diagnostic suggestions, ensuring data privacy and security for sensitive health information, and creating a user-friendly interface for intuitive symptom input.",
    results:
      "Successfully launched an accessible AI-powered health companion that provides preliminary health insights and guidance, empowering users with information for better health management.",
    url: "https://abi-care-ai.netlify.app/",
  },
  {
    id: -3,
    title: "NGAO",
    description:
      "An advanced verification platform that helps distinguish authentic content from AI-generated misinformation. NGAO is dedicated to protecting truth in the age of AI by providing tools to verify content authenticity.",
    image: "/images/ngao-screenshot.png",
    category: "AI",
    technologies: ["AI Detection", "Content Verification", "Misinformation Prevention", "Truth Protection"],
    challenges:
      "Developing sophisticated algorithms to accurately detect AI-generated content in an era of increasingly convincing synthetic media.",
    results:
      "Created a powerful verification platform that helps users distinguish between authentic content and AI-generated misinformation.",
    url: "https://ngao.netlify.app/",
  },
  {
    id: -2,
    title: "ShilingiX",
    description:
      "A Web3 micro-investment platform that enables users to invest in tokenized government securities, infrastructure bonds, and equities with as little as KES 50. ShilingiX democratizes investment opportunities for everyone.",
    image: "/images/shilingix-screenshot.png",
    category: "Fintech",
    technologies: ["Web3", "Blockchain", "Micro-investments", "Tokenization"],
    challenges:
      "Creating an accessible investment platform that lowers barriers to entry while ensuring security and compliance with financial regulations.",
    results:
      "Launched a successful micro-investment platform that allows Kenyans to invest in various securities with minimal capital requirements.",
    url: "https://shilingix.netlify.app/",
  },
  {
    id: -1,
    title: "Joslo",
    description:
      "A natural herbal solutions platform offering premium products that harness the healing power of nature. Joslo Herbs & Chemists provides high-quality herbal remedies and promotes holistic wellness approaches.",
    image: "/images/joslo-screenshot.png",
    category: "Healthcare",
    technologies: ["E-commerce", "Natural Products", "Herbal Database", "Wellness Solutions"],
    challenges:
      "Building a trusted platform that provides accurate information about natural remedies while creating a seamless shopping experience for health-conscious consumers.",
    results:
      "Developed a comprehensive herbal solutions platform that connects users with premium natural products and educational resources.",
    url: "https://joslo.netlify.app",
  },
  {
    id: 0,
    title: "Boots & Backpacks",
    description:
      "An adventure community connecting outdoor enthusiasts to explore breathtaking landscapes together. This platform organizes group adventures and creates a vibrant community for nature lovers.",
    image:
      "https://sjc.microlink.io/lquyRZY2JOyxEz8_QgofB4x6hdHiF4WOY8gcZtO3rUz8nipYMVq132plrmhVQpwLnspzEPJBad-7M4zNaCKcXw.jpeg",
    category: "Community",
    technologies: ["Web Development", "Community Building", "Adventure Planning", "WhatsApp Integration"],
    challenges:
      "Creating an engaging platform that effectively connects adventure enthusiasts and facilitates group expeditions while maintaining a strong community feel.",
    results:
      "Built a thriving community of outdoor enthusiasts who regularly participate in adventures to explore Kenya's most beautiful landscapes.",
    url: "https://boots-backpacks.netlify.app",
  },
  {
    id: 1,
    title: "EltekAI",
    description:
      "An advanced AI platform that transforms research papers into engaging presentations, podcasts, and visual content. Streamline your academic work with our intelligent content transformation tools.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eRbgmBXlCnyPgb422mXW2DgHRYyHpL.png",
    category: "AI",
    technologies: ["AI", "Natural Language Processing", "React", "Node.js"],
    challenges: "Developing sophisticated algorithms to accurately interpret and transform complex academic content.",
    results:
      "Created a powerful tool that significantly reduces the time researchers spend on content creation, allowing them to focus more on their core research activities.",
    url: "https://eltekai.netlify.app/",
  },
  {
    id: 2,
    title: "BomaVerse",
    description:
      "A Next-Gen Real-Estate platform Powered by Blockchain and AI. Empowering real estate stakeholders with reliable and transparent transactions.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EnpzVuwcEh9Y2rijgMSbx5QX6FlD7o.png",
    category: "Blockchain",
    technologies: ["Blockchain", "AI", "React", "Node.js"],
    challenges: "Integrating blockchain technology with traditional real estate processes.",
    results: "Successfully created a transparent and secure platform for real estate transactions.",
    url: "https://bomaverse.netlify.app",
  },
  {
    id: 3,
    title: "Game Logania",
    description:
      "An immersive fantasy game platform that invites players to explore enchanted realms of ancient lore and magical wonder. Discover hidden pathways, forgotten secrets, and mystical landscapes in this 100% free-to-play adventure.",
    image:
      "https://sjc.microlink.io/k0cTf_FcZjYOINIesEZB9_B1Zv55EdCnDMHWo-X2X6myKHjouCLPtXgMvGzArvnSx6o-AnkjXBM1TKbJ_6aAew.jpeg",
    category: "Gaming",
    technologies: ["WebGL", "Three.js", "React", "Node.js"],
    challenges:
      "Creating an engaging and immersive fantasy world with rich lore and interactive elements without requiring subscriptions or sign-ups.",
    results:
      "Developed a captivating free-to-play gaming experience that transports players to magical realms while maintaining accessibility for all users.",
    url: "https://logania.netlify.app",
  },
  {
    id: 4,
    title: "PlantTalks",
    description: "A comprehensive plant database platform providing information about medicinal plants and their uses.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9l728PKik3zRYBBo4kuSFMhU6LKkAL.png",
    category: "AI",
    technologies: ["React", "Node.js", "MongoDB", "Machine Learning"],
    challenges: "Creating an extensive database of plant information with accurate data.",
    results: "Built a user-friendly platform with detailed information about various medicinal plants.",
    url: "https://planttalks.netlify.app",
  },
  {
    id: 5,
    title: "KaguaAI",
    description:
      "An advanced AI-powered platform for detecting code similarity and plagiarism across multiple programming languages. Helps educational institutions and businesses protect intellectual property and ensure academic integrity.",
    image:
      "https://sjc.microlink.io/9S_2oOzPqToZy3uYNveMgRqlseOkwY2wSK04d6RMuLz1lWOQJvT0xx7Fy_8jXos-WmjGo6qZhEIjqmOSPFC57A.jpeg",
    category: "AI",
    technologies: ["AI", "Natural Language Processing", "Machine Learning", "Python"],
    challenges:
      "Developing sophisticated algorithms to detect code similarity across different programming languages and handle code refactoring.",
    results:
      "Created an effective tool for maintaining academic integrity and protecting intellectual property in software development.",
    url: "https://kagua.netlify.app",
  },
  {
    id: 6,
    title: "GreenChain",
    description: "Sustainable blockchain solutions for environmental conservation in Kenya.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fFK1NJbDafPcHxLUVJPkdA3SD5Tyxw.png",
    category: "Blockchain",
    technologies: ["Blockchain", "Solidity", "React", "Node.js"],
    challenges: "Implementing blockchain solutions for environmental sustainability.",
    results: "Successfully launched eco-friendly blockchain initiatives.",
    url: "https://greenchain-ke.netlify.app",
  },
  {
    id: 7,
    title: "Elqufl Cyber Security",
    description: "Comprehensive cybersecurity solutions for businesses and individuals.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WXr2P28XqCCVjz7vAgWHUAudqQ0rZp.png",
    category: "Cybersecurity",
    technologies: ["Network Security", "Encryption", "Threat Detection"],
    challenges: "Developing robust security measures against evolving cyber threats.",
    results: "Implemented cutting-edge cybersecurity solutions to protect clients' digital assets.",
    url: "https://elqufl.wixsite.com/elquflcybersecurity",
  },
  {
    id: 8,
    title: "Shoeplug 254",
    description: "An e-commerce platform specializing in trendy footwear for the Kenyan market.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kNgLAxOhECnSq4TScIb6cT9ayJp8yj.png",
    category: "E-commerce",
    technologies: ["React", "Node.js", "MongoDB", "Payment Integration"],
    challenges: "Creating a user-friendly online shopping experience for shoes.",
    results: "Launched a successful e-commerce platform with a wide range of footwear options.",
    url: "https://elqufl.wixsite.com/shoe-plug-254",
  },
  {
    id: 9,
    title: "Joslo Herbal Clinic",
    description: "A digital platform for a herbal clinic promoting natural and holistic healing.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-olp7DhATZQd3roXa2lbgTUxqpyQkHO.png",
    category: "Healthcare",
    technologies: ["Web Development", "Content Management", "SEO"],
    challenges: "Effectively showcasing herbal remedies and services online.",
    results: "Created an informative and engaging website for herbal medicine enthusiasts.",
    url: "https://elqufl.wixsite.com/josloherbalclinic",
  },
  {
    id: 10,
    title: "Smart Labels Printers",
    description: "A professional printing service specializing in high-quality label production.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0WUNJYlfvLK8hHCK4JW5HDu6p6uZwn.png",
    category: "Manufacturing",
    technologies: ["E-commerce", "Print-on-Demand", "Inventory Management"],
    challenges: "Streamlining the process of custom label ordering and production.",
    results: "Developed an efficient online platform for ordering and managing label printing services.",
    url: "https://elqufl.wixsite.com/smart-labels-printer",
  },
  {
    id: 11,
    title: "SkillsSync AI",
    description:
      "An AI-powered HR platform that helps companies upskill and redeploy talent instead of replacing them. SkillsSync AI uses advanced algorithms to match employee skills with internal opportunities and provides personalized learning paths.",
    image: "/images/skillssync-screenshot.jpeg",
    category: "AI",
    technologies: ["AI", "Machine Learning", "HR Analytics", "Skill Matching", "React", "Node.js"],
    challenges:
      "Developing sophisticated AI algorithms to accurately assess employee skills and match them with internal opportunities while creating personalized development pathways.",
    results:
      "Created a comprehensive HR platform that helps companies retain talent through strategic upskilling and internal mobility, reducing turnover and improving employee satisfaction.",
    url: "https://skillssync-ai.netlify.app/",
  },
  {
    id: 12,
    title: "Herina Events & Decor",
    description:
      "A premium catering and events company specializing in culinary excellence. Herina Events & Decor provides exquisite catering services for all special occasions, combining exceptional food quality with elegant event decoration.",
    image: "/images/herina-screenshot.png",
    category: "Events",
    technologies: ["Web Development", "Event Management", "Catering Services", "Responsive Design"],
    challenges:
      "Creating an elegant and professional website that showcases culinary excellence while providing easy navigation for potential clients to explore services and contact information.",
    results:
      "Developed a sophisticated website that effectively represents the brand's commitment to culinary excellence and helps clients easily access catering services for their special occasions.",
    url: "https://herina.netlify.app/",
  },
  {
    id: 13,
    title: "Masquerade & Masks Kenya",
    description:
      "A premium collection platform for masquerade masks in Kenya, offering everything from elegant lace designs to futuristic LED masks. The platform specializes in handcrafted masterpieces that transform events and celebrations.",
    image: "/images/masks-masquerades-screenshot.png",
    category: "E-commerce",
    technologies: ["Web Development", "E-commerce", "Product Showcase", "Event Planning"],
    challenges:
      "Creating a visually striking platform that effectively showcases the artistic beauty and variety of masquerade masks while providing an engaging user experience for event planners and party enthusiasts.",
    results:
      "Built an artistic and vibrant platform that successfully highlights the premium mask collection and helps customers discover unique pieces for their special events and celebrations.",
    url: "https://masks-masquerades.netlify.app/",
  },
  {
    id: 14,
    title: "Lagoon Private Investigators",
    description:
      "A professional portfolio website for a private investigation agency. The platform showcases investigative services with a focus on justice, professionalism, and confidentiality, featuring comprehensive information about their expertise and case handling capabilities.",
    image: "/images/lagoon-investigators-screenshot.png",
    category: "Services",
    technologies: ["Web Development", "Professional Portfolio", "Service Showcase", "Contact Management"],
    challenges:
      "Designing a trustworthy and professional website that conveys reliability and confidentiality while clearly presenting investigative services and building client confidence.",
    results:
      "Created a professional and authoritative website that effectively represents the investigation agency's expertise and helps potential clients understand their services and contact them securely.",
    url: "https://lagoonprivateinvestigators.netlify.app/",
  },
]

const upcomingProjects = [
  {
    id: 1,
    title: "Taksi",
    description:
      "Revolutionary blockchain-based ride-hailing platform with subscription model and hardware tracking system. Offering safer, cheaper rides through a decentralized network of drivers.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-g82ZRsJ2EtrBC4MY4bPRkcdhlJu7dP.png",
    category: "Blockchain",
    technologies: ["Blockchain", "IoT", "React Native", "Node.js"],
    features: [
      "Subscription-based driver model",
      "Custom hardware tracking",
      "Decentralized payment system",
      "Real-time ride monitoring",
    ],
  },
  {
    id: 2,
    title: "PredictaAI",
    description:
      "AI-powered social media analytics platform providing personalized and accurate sales insights for businesses.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VsqWGQTHw9nIA88NOtU27y3P9awIuR.png",
    category: "AI",
    technologies: ["AI", "Machine Learning", "Data Analytics", "Python"],
    features: ["Real-time sales predictions", "Personalized insights", "Multi-platform analytics", "Trend forecasting"],
  },
  {
    id: 3,
    title: "Selekta",
    description:
      "Advanced AI system for screening job, internship, and tender applications, streamlining the recruitment process.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DlYKB6eao89qvyNUgCVwjDrQ73Q2AY.png",
    category: "AI",
    technologies: ["AI", "Natural Language Processing", "Machine Learning", "Python"],
    features: [
      "Automated application screening",
      "Custom criteria matching",
      "Bulk processing capability",
      "Integration with HR systems",
    ],
  },
  {
    id: 4,
    title: "LimaGro",
    description:
      "Blockchain-based agricultural supply chain platform for tracking cash crops and ensuring fair compensation for farmers.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K5ToJU39Hq4QBY6SmQbAb9zvMd0xUU.png",
    category: "Blockchain",
    technologies: ["Blockchain", "Smart Contracts", "React", "Node.js"],
    features: ["Real-time crop tracking", "Smart contract payments", "Export documentation", "Price transparency"],
  },
]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All")
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

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const filteredUpcomingProjects =
    selectedCategory === "All" || selectedCategory === "Coming Soon" ? upcomingProjects : []

  const categories = ["All", ...new Set([...projects.map((project) => project.category), "Coming Soon"])]

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 className="text-4xl font-bold mb-8 text-center gradient-text" variants={itemVariants}>
          Our Projects
        </motion.h1>

        <motion.div className="flex justify-center mb-8 flex-wrap gap-2" variants={itemVariants}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary via-secondary to-accent text-white"
                  : "bg-card text-foreground hover:bg-primary/20"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} variants={cardVariants} custom={index} className="card-stack-item group">
              <Link
                href={project.url}
                target="_blank"
                className="block bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 gradient-text">{project.title}</h2>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Technologies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Challenges:</h3>
                    <p className="text-muted-foreground">{project.challenges}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Results:</h3>
                    <p className="text-muted-foreground">{project.results}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredUpcomingProjects.length > 0 && (
          <>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-center gradient-text">
              Coming Soon
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUpcomingProjects.map((project, index) => (
                <motion.div key={project.id} variants={cardVariants} custom={index} className="card-stack-item group">
                  <div className="relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                        <Clock className="w-4 h-4 mr-1" />
                        Coming Soon
                      </div>
                    </div>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-contain transform group-hover:scale-105 transition-transform duration-300 p-4"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2 gradient-text">{project.title}</h2>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="mb-4">
                        <h3 className="font-semibold mb-2">Technologies:</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Key Features:</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          {project.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
