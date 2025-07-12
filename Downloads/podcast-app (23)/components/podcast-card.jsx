"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Individual Podcast Card Component
 * Displays podcast information with search highlighting.
 */
export function PodcastCard({ podcast, searchQuery = "" }) {
  const highlightSearchTerms = (text, query) => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Genre mapping (re-defined here for self-containment, or could be imported from a shared data file)
  const genreMapping = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  }

  const getGenreTitles = (genreIds) => {
    return genreIds.map((id) => genreMapping[id] || `Genre ${id}`).join(", ")
  }

  return (
    <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
      {/* Podcast Image */}
      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        <img
          src={podcast.image || "/placeholder.svg?height=300&width=300"}
          alt={podcast.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Podcast Information */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold line-clamp-2">
          {highlightSearchTerms(podcast.title, searchQuery)}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 space-y-1 text-sm text-muted-foreground">
        <p>Seasons: {podcast.seasons}</p>
        <p>Genres: {getGenreTitles(podcast.genres)}</p>
        <p>Updated: {formatDate(podcast.updated)}</p>
      </CardContent>
    </Card>
  )
}
