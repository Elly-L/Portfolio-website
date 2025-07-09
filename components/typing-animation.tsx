"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  text: string
  delay?: number
  className?: string
}

export function TypingAnimation({ text, delay = 100, className = "" }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    // Check if it's a low-end device
    const isLowRes = window.matchMedia("(max-resolution: 1dppx)").matches
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches
    setIsLowEndDevice(isLowRes && isSmallScreen)
  }, [])

  useEffect(() => {
    if (isLowEndDevice) {
      setDisplayText(text)
      return
    }

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 1000) // Pause for 1 second when complete
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false)
        setCurrentIndex(0)
        return
      }

      const deleteTimeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
      }, delay / 2)
      return () => clearTimeout(deleteTimeout)
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else {
      setIsPaused(true)
    }
  }, [currentIndex, delay, text, isDeleting, isPaused, displayText.length, isLowEndDevice])

  return (
    <span className={`${className} typing-cursor ${isLowEndDevice ? "" : "gradient-text"}`}>
      {displayText}
      <span className="sr-only">{text}</span>
    </span>
  )
}
