import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, sortFavorites } from '../redux/favoritesSlice';
import { formatDate } from '../utils/dateUtils';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.episodes);

  const handleRemoveFavorite = (episode) => {
    dispatch(removeFavorite(episode));
  };

  const handleSort = (sortType) => {
    dispatch(sortFavorites(sortType));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Favorites</h1>
      <div className="mb-4">
        <button onClick={() => handleSort('asc')} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">Sort A-Z</button>
        <button onClick={() => handleSort('desc')} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">Sort Z-A</button>
        <button onClick={() => handleSort('recent')} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">Most Recent</button>
        <button onClick={() => handleSort('oldest')} className="bg-blue-500 text-white px-2 py-1 rounded">Oldest</button>
      </div>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div>
          {favorites.map((episode) => (
            <div key={episode.id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-bold">{episode.title}</h2>
              <p className="text-gray-600">Show: {episode.showTitle}</p>
              <p className="text-gray-600">Added: {formatDate(episode.addedAt)}</p>
              <button
                onClick={() => handleRemoveFavorite(episode)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;

