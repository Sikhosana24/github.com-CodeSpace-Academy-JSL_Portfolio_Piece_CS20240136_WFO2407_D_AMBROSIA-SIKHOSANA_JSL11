import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Show from './pages/Show'
import Favorites from './pages/Favorites'
import EpisodePlayer from './components/EpisodePlayer'

function App() {
  const [currentEpisode, setCurrentEpisode] = useState(null)

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (currentEpisode) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [currentEpisode])

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home setCurrentEpisode={setCurrentEpisode} />} />
          <Route path="/show/:id" element={<Show setCurrentEpisode={setCurrentEpisode} />} />
          <Route path="/favorites" element={<Favorites setCurrentEpisode={setCurrentEpisode} />} />
        </Routes>
      </main>
      {currentEpisode && <EpisodePlayer episode={currentEpisode} />}
    </div>
  )
}

export default App

