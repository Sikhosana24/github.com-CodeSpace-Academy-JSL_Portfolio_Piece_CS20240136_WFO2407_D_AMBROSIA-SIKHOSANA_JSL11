"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

/**
 * Pagination Controls Component
 * Handles page navigation with smart ellipsis and state preservation
 * P3.63: Navigate through pages using numbered pagination
 * P3.65: Current search, filter, and sort state remain intact
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current active page number
 * @param {number} props.totalPages - Total number of pages
 * @param {number} props.totalItems - Total number of items
 * @param {number} props.itemsPerPage - Items displayed per page
 * @param {Function} props.onPageChange - Callback function for page changes
 * @returns {JSX.Element} Pagination controls with navigation buttons
 */
export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationControlsProps) {
  /**
   * Generates array of page numbers to display with smart ellipsis
   * P3.63: Efficient navigation through large page sets
   *
   * @returns {(number | string)[]} Array of page numbers and ellipsis indicators
   */
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = []
    const maxVisible = 7 // Maximum visible page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total is within limit
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 4) {
        // Show pages 2-5 and ellipsis
        for (let i = 2; i <= 5; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
      } else if (currentPage >= totalPages - 3) {
        // Show ellipsis and last 4 pages
        pages.push("ellipsis")
        for (let i = totalPages - 4; i <= totalPages - 1; i++) {
          pages.push(i)
        }
      } else {
        // Show ellipsis, current page area, ellipsis
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  /**
   * Calculates the range of items being displayed
   *
   * @returns {Object} Object with start and end item numbers
   */
  const getItemRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1
    const end = Math.min(currentPage * itemsPerPage, totalItems)
    return { start, end }
  }

  const { start, end } = getItemRange()
  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Results Summary */}
      <div className="text-sm text-muted-foreground text-center">
        Showing {start} to {end} of {totalItems} results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <div key={`ellipsis-${index}`} className="px-2">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
              )
            }

            const pageNumber = page as number
            const isCurrentPage = pageNumber === currentPage

            return (
              <Button
                key={pageNumber}
                variant={isCurrentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                className={`min-w-[40px] ${isCurrentPage ? "pointer-events-none" : ""}`}
                disabled={isCurrentPage}
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Jump (for large page sets) */}
      {totalPages > 10 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Jump to:</span>
          <div className="flex gap-1">
            {currentPage > 5 && (
              <Button variant="ghost" size="sm" onClick={() => onPageChange(1)} className="text-xs">
                First
              </Button>
            )}
            {currentPage < totalPages - 4 && (
              <Button variant="ghost" size="sm" onClick={() => onPageChange(totalPages)} className="text-xs">
                Last
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
