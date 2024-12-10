import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getShows, sortShows, filterShowsByGenre } from '../redux/showsSlice';
import { formatDate } from '../utils/dateUtils';

const ShowList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.shows);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    if (status === 'idle') {
      dispatch(getShows());
    }
    fetchGenres().then(setGenres);
  }, [status, dispatch]);

  const handleSort = (sortType) => {
    dispatch(sortShows(sortType));
  };

  const handleFilter = (genreId) => {
    setFilter(genreId);
    dispatch(filterShowsByGenre(genreId));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const filteredShows = filter
    ? list.filter((show) => show.genres.includes(parseInt(filter)))
    : list;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select onChange={(e) => handleFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.title}
            </option>
          ))}
        </select>
        <button onClick={() => handleSort('asc')} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
          Sort A-Z
        </button>
        <button onClick={() => handleSort('desc')} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
          Sort Z-A
        </button>
        <button onClick={() => handleSort('recent')} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
          Most Recent
        </button>
        <button onClick={() => handleSort('oldest')} className="bg-blue-500 text-white px-2 py-1 rounded">
          Oldest
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShows.map((show) => (
          <Link key={show.id} to={`/show/${show.id}`} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={show.image} alt={show.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{show.title}</h2>
              <p className="text-gray-600 mb-2">Seasons: {show.seasons}</p>
              <p className="text-gray-600 mb-2">Last updated: {formatDate(show.updated)}</p>
              <p className="text-gray-600">Genres: {show.genres.join(', ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowList;

// Dummy function for fetching genres - replace with your actual implementation
const fetchGenres = async () => {
  //Simulate fetching genres
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, title: 'Action' },
    { id: 2, title: 'Comedy' },
    { id: 3, title: 'Drama' },
    { id: 4, title: 'Sci-Fi' },
  ];
};

