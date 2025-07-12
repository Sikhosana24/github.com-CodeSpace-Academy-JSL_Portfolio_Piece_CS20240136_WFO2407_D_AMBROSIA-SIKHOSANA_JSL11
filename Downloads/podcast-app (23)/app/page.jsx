"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { PodcastGrid } from "@/components/podcast-grid"
import { Header } from "@/components/header" // Import Header

// Genre mapping moved directly into page.jsx
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

// Sample data as fallback, using the provided image URL
const samplePodcasts = [
  {
    id: "1",
    title: "Tides of History",
    description: "A podcast about history, culture, and how the past shapes our present.",
    seasons: 5,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-12%20173006-Bf621k0vsVWzlZa6cEwLS8wH3AtVE2.png",
    genres: [3],
    updated: "2022-11-03T10:00:00Z",
  },
  {
    id: "2",
    title: "Something Was Wrong",
    description: "A true-crime podcast that explores the complex dynamics of abusive relationships.",
    seasons: 14,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-12%20173006-Bf621k0vsVWzlZa6cEwLS8wH3AtVE2.png",
    genres: [1, 2],
    updated: "2022-11-03T15:30:00Z",
  },
  {
    id: "3",
    title: "American History Tellers",
    description: "Stories from American history, told by those who lived them.",
    seasons: 51,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-12%20173006-Bf621k0vsVWzlZa6cEwLS8wH3AtVE2.png",
    genres: [3],
    updated: "2022-11-02T09:15:00Z",
  },
  {
    id: "4",
    title: "British Scandal",
    description: "A podcast about the biggest scandals in British history.",
    seasons: 19,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-12%20173006-Bf621k0vsVWzlZa6cEwLS8wH3AtVE2.png",
    genres: [2],
    updated: "2022-11-02T14:20:00Z",
  },
  {
    id: "5",
    title: "This Is Actually Happening",
    description: "First-person stories of life-changing events.",
    seasons: 12,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-12%20173006-Bf621k0vsVWzlZa6cEwLS8wH3AtVE2.png",
    genres: [2],
    updated: "2022-11-01T11:00:00Z",
  },
  {
    id: "6",
    title: "Even the Rich",
    description: "The scandalous lives of the world's most famous families.",
    seasons: 33,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-12%20173006-Bf621k0vsVWzlZa6cEwLS8wH3AtVE2.png",
    genres: [4, 5, 3],
    updated: "2022-11-01T16:45:00Z",
  },
  {
    id: "7",
    title: "Killer Psyche",
    description: "Forensic psychologist Candice DeLong delves into the minds of criminals.",
    seasons: 2,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-12%20173006-Bf621k0vsVWzlZa6cEwLS8wH3AtVE2.png",
    genres: [3, 2],
    updated: "2022-11-01T09:00:00Z",
  },
  {
    id: "8",
    title: "Against The Odds",
    description: "True stories of people who faced impossible challenges and emerged victorious.",
    seasons: 19,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-12%20173006-Bf621k0vsVWzlZa6cEwLS8wH3AtVE2.png",
    genres: [3],
    updated: "2022-11-01T13:10:00Z",
  },
]

/**
 * Pagination Controls Component
 * Handles page navigation with smart ellipsis and state preservation.
 */
function PaginationControls({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 7

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
      } else if (currentPage >= totalPages - 3) {
        pages.push("ellipsis")
        for (let i = totalPages - 4; i <= totalPages - 1; i++) {
          pages.push(i)
        }
      } else {
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
      }
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }
    return pages
  }

  const getItemRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1
    const end = Math.min(currentPage * itemsPerPage, totalItems)
    return { start, end }
  }

  const { start, end } = getItemRange()
  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-muted-foreground text-center">
        Showing {start} to {end} of {totalItems} results
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-1"
        >
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <div key={`ellipsis-${index}`} className="px-2">
                  <span className="text-muted-foreground">...</span>
                </div>
              )
            }

            const pageNumber = page
            const isCurrentPage = pageNumber === currentPage

            return (
              <Button
                key={pageNumber}
                variant={isCurrentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                className="min-w-[40px]"
                disabled={isCurrentPage}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gap-1"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

/**
 * Main Podcast Application Component
 * Defines the overall page structure and UI.
 */
export default function PodcastApp() {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingSampleData, setUsingSampleData] = useState(false)

  const [filterSort, setFilterSort] = useState({
    searchQuery: "",
    selectedGenre: "all",
    sortBy: "newest",
  })

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
    totalPages: 0,
  })

  // This state is passed to the Header component for the search input
  const [searchInput, setSearchInput] = useState("")

  /**
   * Fetches podcast data from API with fallback to sample data
   */
  const fetchPodcasts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setUsingSampleData(false)

      console.log("Fetching podcasts from API...")
      const response = await fetch("https://podcast-api.netlify.app")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API data received:", data.length, "podcasts")

      if (data && data.length > 0) {
        setPodcasts(data)
      } else {
        throw new Error("No data received from API")
      }
    } catch (err) {
      console.error("API fetch failed, using sample data:", err)
      setError("Using sample data - API unavailable")
      setPodcasts(samplePodcasts)
      setUsingSampleData(true)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch data on mount
  useEffect(() => {
    fetchPodcasts()
  }, [fetchPodcasts])

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilterSort((prev) => ({ ...prev, searchQuery: searchInput }))
      setPagination((prev) => ({ ...prev, currentPage: 1 }))
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchInput])

  // Filter and sort podcasts
  const filteredAndSortedPodcasts = useMemo(() => {
    let result = [...podcasts]

    // Apply search filter
    if (filterSort.searchQuery.trim()) {
      const query = filterSort.searchQuery.toLowerCase().trim()
      result = result.filter(
        (podcast) => podcast.title.toLowerCase().includes(query) || podcast.description.toLowerCase().includes(query),
      )
    }

    // Apply genre filter (single select)
    if (filterSort.selectedGenre !== "all") {
      result = result.filter((podcast) => podcast.genres.includes(Number.parseInt(filterSort.selectedGenre)))
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filterSort.sortBy) {
        case "newest":
          return new Date(b.updated).getTime() - new Date(a.updated).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return result
  }, [podcasts, filterSort])

  // Update pagination
  useEffect(() => {
    const totalItems = filteredAndSortedPodcasts.length
    const totalPages = Math.ceil(totalItems / pagination.itemsPerPage)

    setPagination((prev) => ({
      ...prev,
      totalItems,
      totalPages,
      currentPage: Math.min(prev.currentPage, Math.max(1, totalPages)),
    }))
  }, [filteredAndSortedPodcasts, pagination.itemsPerPage])

  // Get current page podcasts
  const paginatedPodcasts = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
    const endIndex = startIndex + pagination.itemsPerPage
    return filteredAndSortedPodcasts.slice(startIndex, endIndex)
  }, [filteredAndSortedPodcasts, pagination.currentPage, pagination.itemsPerPage])

  const handleSortChange = useCallback((value) => {
    setFilterSort((prev) => ({
      ...prev,
      sortBy: value,
    }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }, [])

  // Handle single genre selection
  const handleGenreChange = useCallback((value) => {
    setFilterSort((prev) => ({
      ...prev,
      selectedGenre: value,
    }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }, [])

  const handlePageChange = useCallback((page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <>
      <Header searchQuery={searchInput} onSearchChange={setSearchInput} />
      <div className="container mx-auto px-4 py-8">
        {/* Error/Sample Data Alert */}
        {usingSampleData && (
          <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">Using sample data - API temporarily unavailable</span>
            <Button variant="outline" size="sm" onClick={fetchPodcasts} className="ml-auto bg-transparent">
              Retry API
            </Button>
          </div>
        )}

        {/* Filter by and Dropdowns */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-muted-foreground">Filter by:</span>
          <Select
            value={filterSort.selectedGenre === "all" ? "all" : filterSort.selectedGenre.toString()}
            onValueChange={handleGenreChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ALL GENRES" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL GENRES</SelectItem>
              {Object.entries(genreMapping).map(([id, title]) => (
                <SelectItem key={id} value={id}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterSort.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Most Recent First" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Most Recent First</SelectItem>
              <SelectItem value="title-asc">Title A-Z</SelectItem>
              <SelectItem value="title-desc">Title Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Podcast Grid */}
        <PodcastGrid podcasts={paginatedPodcasts} searchQuery={filterSort.searchQuery} />

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={filteredAndSortedPodcasts.length}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  )
}
