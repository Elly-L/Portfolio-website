import { NextResponse } from "next/server"

const websiteInfo = {
  services: [
    "AI Solutions",
    "Blockchain Development",
    "IoT Integration",
    "Custom Software Development",
    "Data Analytics",
    "Mobile App Development",
    "Web Development",
    "Cloud Solutions",
    "Cybersecurity",
  ],
  projects: [
    {
      name: "EltekAI",
      description:
        "An advanced AI platform that transforms research papers into engaging presentations, podcasts, and visual content.",
    },
    { name: "BomaVerse", description: "A revolutionary blockchain-based platform for real estate transactions." },
    {
      name: "Game Logania",
      description: "An immersive fantasy game platform exploring enchanted realms of ancient lore and magical wonder.",
    },
    {
      name: "PlantTalks",
      description:
        "A comprehensive plant database platform providing information about medicinal plants and their uses.",
    },
    {
      name: "KaguaAI",
      description:
        "An advanced AI-powered platform for detecting code similarity and plagiarism across multiple programming languages.",
    },
    { name: "GreenChain", description: "Sustainable blockchain solutions for environmental conservation in Kenya." },
    {
      name: "Elqufl Cyber Security",
      description: "Comprehensive cybersecurity solutions for businesses and individuals.",
    },
    {
      name: "Shoeplug 254",
      description: "An e-commerce platform specializing in trendy footwear for the Kenyan market.",
    },
    {
      name: "Joslo Herbal Clinic",
      description: "A digital platform for a herbal clinic promoting natural and holistic healing.",
    },
    {
      name: "Smart Labels Printers",
      description: "A professional printing service specializing in high-quality label production.",
    },
    {
      name: "Boots & Backpacks",
      description: "A premium e-commerce platform specializing in high-quality outdoor gear and adventure equipment.",
    },
  ],
}

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("services") || lowerMessage.includes("offer")) {
    return `Eltek offers a wide range of services, including: ${websiteInfo.services.join(", ")}. Which service would you like to know more about?`
  }

  if (lowerMessage.includes("projects") || lowerMessage.includes("portfolio")) {
    return `Eltek has worked on various exciting projects, such as: ${websiteInfo.projects.map((p) => p.name).join(", ")}. Would you like more information about any specific project?`
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("reach")) {
    return "You can contact Eltek by visiting our Contact page. There you'll find our phone number, email address, and a contact form for your convenience."
  }

  if (lowerMessage.includes("about") || lowerMessage.includes("company")) {
    return "Eltek is a tech startup revolutionizing the AI & Blockchain space with cutting-edge solutions. We combine innovation with expertise to deliver exceptional solutions. You can find more details on our About page."
  }

  // Check for specific project inquiries
  const projectMatch = websiteInfo.projects.find((p) => lowerMessage.includes(p.name.toLowerCase()))
  if (projectMatch) {
    return `${projectMatch.name} is one of our key projects. ${projectMatch.description} Would you like to know more about our other projects?`
  }

  // Check for specific service inquiries
  const serviceMatch = websiteInfo.services.find((s) => lowerMessage.includes(s.toLowerCase()))
  if (serviceMatch) {
    return `Our ${serviceMatch} service is designed to help businesses leverage cutting-edge technology. Would you like more details about this or any of our other services?`
  }

  return "I'm not sure how to answer that. Can you please ask about our services, projects, or how to contact us? I'd be happy to provide information on those topics."
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    const reply = generateResponse(message)
    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
