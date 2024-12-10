import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToHistory } from '../redux/historySlice';

const EpisodePlayer = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      dispatch(addToHistory(episode.id));
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [dispatch, episode.id]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">{episode.title}</h3>
          <p className="text-sm text-gray-600">{episode.show}</p>
        </div>
        <div className="flex items-center">
          <button onClick={togglePlayPause} className="mr-4">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="w-64 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={episode.file} />
    </div>
  );
};

export default EpisodePlayer;

