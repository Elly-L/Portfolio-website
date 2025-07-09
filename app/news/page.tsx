"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { Shuffle, Calendar, ExternalLink, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

// Categories for filtering
const categories = ["All", "AI", "Blockchain", "Cryptocurrency", "Technology", "Innovation"]

interface Article {
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
  source: {
    name: string
  }
}

// Fallback articles in case the API fails
const fallbackArticles: Article[] = [
  {
    title: "AI Breakthrough: New Algorithm Mimics Human Learning",
    description:
      "Researchers have developed a new AI algorithm that closely mimics human learning patterns, potentially revolutionizing machine learning applications.",
    url: "https://example.com/ai-breakthrough",
    urlToImage: "/placeholder.svg?height=300&width=400",
    publishedAt: new Date().toISOString(),
    source: { name: "Tech Innovators" },
  },
  {
    title: "Blockchain Adoption Surges in Finance Sector",
    description:
      "Major banks and financial institutions are increasingly adopting blockchain technology, citing improved security and efficiency in transactions.",
    url: "https://example.com/blockchain-finance",
    urlToImage: "/placeholder.svg?height=300&width=400",
    publishedAt: new Date().toISOString(),
    source: { name: "Crypto News Daily" },
  },
  {
    title: "New Quantum Computing Milestone Achieved",
    description:
      "Scientists have reached a new milestone in quantum computing, demonstrating a quantum processor that outperforms traditional supercomputers in specific tasks.",
    url: "https://example.com/quantum-milestone",
    urlToImage: "/placeholder.svg?height=300&width=400",
    publishedAt: new Date().toISOString(),
    source: { name: "Quantum Tech Review" },
  },
]

export default function News() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  // Fetch news from our API route
  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/news")

      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.articles || data.articles.length === 0) {
        throw new Error("No articles returned from API")
      }

      // Filter out articles without images and with duplicate titles
      const uniqueTitles = new Set()
      const filteredNews = data.articles.filter((article: Article) => {
        const hasImage = article.urlToImage
        const isDuplicate = uniqueTitles.has(article.title)

        if (!isDuplicate && hasImage) {
          uniqueTitles.add(article.title)
          return true
        }
        return false
      })

      setArticles(filteredNews)
      setFilteredArticles(filteredNews)
    } catch (error) {
      console.error("Error fetching news:", error)
      setError("Failed to load news. Displaying fallback content.")
      setArticles(fallbackArticles)
      setFilteredArticles(fallbackArticles)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  // Filter articles based on selected category and search query
  useEffect(() => {
    if (articles.length === 0) return

    let filtered = [...articles]

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          article.description.toLowerCase().includes(selectedCategory.toLowerCase()),
      )
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredArticles(filtered)
  }, [selectedCategory, searchQuery, articles])

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Shuffle articles
  const shuffleArticles = () => {
    const shuffled = [...filteredArticles]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setFilteredArticles(shuffled)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={containerVariants}>
        <motion.h1 className="text-4xl font-bold mb-8 text-center gradient-text" variants={itemVariants}>
          Tech News
        </motion.h1>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
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
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={shuffleArticles} variant="outline" className="flex-shrink-0">
                <Shuffle className="h-4 w-4 mr-2" />
                Shuffle
              </Button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <motion.div variants={itemVariants} className="text-center text-destructive p-8">
            <p>{error}</p>
          </motion.div>
        ) : filteredArticles.length === 0 ? (
          <motion.div variants={itemVariants} className="text-center p-8">
            <p>No articles found matching your criteria. Try a different search or category.</p>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
            {filteredArticles.map((article, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.urlToImage || "/placeholder.svg?height=300&width=400"}
                    alt={article.title}
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{article.description}</p>

                  <div className="flex items-center text-sm text-muted-foreground mb-4 mt-auto">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{article.source.name}</span>
                  </div>

                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
                  >
                    Read More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
