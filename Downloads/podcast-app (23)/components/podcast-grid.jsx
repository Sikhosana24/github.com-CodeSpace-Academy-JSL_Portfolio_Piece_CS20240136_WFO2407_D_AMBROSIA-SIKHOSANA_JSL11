"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PodcastCard } from "./podcast-card"

/**
 * Podcast Grid Component
 * Displays a grid of podcast cards or a "no results" message.
 */
export function PodcastGrid({ podcasts, searchQuery }) {
  return (
    <>
      {podcasts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
          {podcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} searchQuery={searchQuery} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">No podcasts found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </>
  )
}
