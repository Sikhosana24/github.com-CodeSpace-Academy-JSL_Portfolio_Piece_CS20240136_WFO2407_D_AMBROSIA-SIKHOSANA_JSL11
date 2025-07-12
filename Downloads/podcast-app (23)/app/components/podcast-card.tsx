"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Play } from "lucide-react"
import { genreMapping } from "../data"
import type { PodcastPreview } from "../types"
import type { JSX } from "react"

interface PodcastCardProps {
  podcast: PodcastPreview
  searchQuery?: string
}

/**
 * Individual Podcast Card Component
 * Displays podcast information with search highlighting
 * P3.55: Updates immediately with search results
 *
 * @component
 * @param {Object} props - Component props
 * @param {PodcastPreview} props.podcast - Podcast data to display
 * @param {string} props.searchQuery - Current search query for highlighting
 * @returns {JSX.Element} Podcast card with all relevant information
 */
export function PodcastCard({ podcast, searchQuery = "" }: PodcastCardProps) {
  /**
   * Highlights search terms in text
   * P3.68: Immediate reflection of user choices
   *
   * @param {string} text - Text to highlight
   * @param {string} query - Search query to highlight
   * @returns {JSX.Element} Text with highlighted search terms
   */
  const highlightSearchTerms = (text: string, query: string): JSX.Element => {
    if (!query.trim()) {
      return <span>{text}</span>
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded-sm">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </span>
    )
  }

  /**
   * Formats the last updated date for display
   *
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 group cursor-pointer">
      {/* Podcast Image */}
      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        <img
          src={podcast.image || "/placeholder.svg?height=300&width=300"}
          alt={podcast.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>

      {/* Podcast Information */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {highlightSearchTerms(podcast.title, searchQuery)}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm">
          {highlightSearchTerms(podcast.description, searchQuery)}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Play className="w-4 h-4" />
            <span>
              {podcast.seasons} season{podcast.seasons !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(podcast.updated)}</span>
          </div>
        </div>

        {/* Genre Badges */}
        <div className="flex flex-wrap gap-1">
          {podcast.genres.slice(0, 3).map((genreId) => (
            <Badge key={genreId} variant="outline" className="text-xs">
              {genreMapping[genreId] || `Genre ${genreId}`}
            </Badge>
          ))}
          {podcast.genres.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{podcast.genres.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
