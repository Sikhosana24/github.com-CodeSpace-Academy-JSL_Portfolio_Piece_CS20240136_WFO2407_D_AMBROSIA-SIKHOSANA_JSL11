import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getShowDetails } from '../redux/showsSlice';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { formatDate } from '../utils/dateUtils';

const ShowDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentShow, status, error } = useSelector((state) => state.shows);
  const favorites = useSelector((state) => state.favorites.episodes);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    dispatch(getShowDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!currentShow) {
    return null;
  }

  const handleFavorite = (episode) => {
    const isFavorite = favorites.some(fav => fav.id === episode.id);
    if (isFavorite) {
      dispatch(removeFavorite(episode));
    } else {
      dispatch(addFavorite({ ...episode, showId: currentShow.id, showTitle: currentShow.title }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">&larr; Back to Shows</Link>
      <h1 className="text-3xl font-bold mb-4">{currentShow.title}</h1>
      <img src={currentShow.image} alt={currentShow.title} className="w-full max-w-md mb-4" />
      <p className="mb-4">{currentShow.description}</p>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Seasons</h2>
        <select 
          onChange={(e) => setSelectedSeason(currentShow.seasons[e.target.value])}
          className="border p-2 rounded"
        >
          <option value="">Select a season</option>
          {currentShow.seasons.map((season, index) => (
            <option key={season.season} value={index}>
              Season {season.season} ({season.episodes.length} episodes)
            </option>
          ))}
        </select>
      </div>
      {selectedSeason && (
        <div>
          <h3 className="text-xl font-bold mb-2">Episodes</h3>
          {selectedSeason.episodes.map((episode) => (
            <div key={episode.id} className="mb-4 p-4 border rounded">
              <h4 className="text-lg font-bold">{episode.title}</h4>
              <p>{episode.description}</p>
              <p>Date: {formatDate(episode.date)}</p>
              <audio controls className="mt-2 w-full">
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <button 
                onClick={() => handleFavorite(episode)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                {favorites.some(fav => fav.id === episode.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowDetails;

