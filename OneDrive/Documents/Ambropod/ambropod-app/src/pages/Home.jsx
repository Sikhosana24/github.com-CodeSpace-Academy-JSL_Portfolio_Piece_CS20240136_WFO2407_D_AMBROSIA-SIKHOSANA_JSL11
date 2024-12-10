import React from 'react';
import ShowList from '../components/ShowList';
import { useDispatch } from 'react-redux';
import { resetHistory } from '../redux/historySlice';

const Home = () => {
  const dispatch = useDispatch();

  const handleResetHistory = () => {
    if (window.confirm('Are you sure you want to reset your entire listening history?')) {
      dispatch(resetHistory());
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">Podcast Shows</h1>
      <ShowList />
      <button onClick={handleResetHistory} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Reset Listening History
      </button>
    </div>
  );
};

export default Home;

