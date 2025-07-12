"use client"

import { Podcast, Search, User, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

/**
 * Header Component for the Podcast App
 * Displays the app title, search input, and user icon.
 */
export function Header({ searchQuery, onSearchChange }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-background sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Podcast className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">PodcastApp</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-8"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <User className="h-6 w-6 text-muted-foreground cursor-pointer" />
      </div>
    </header>
  )
}
