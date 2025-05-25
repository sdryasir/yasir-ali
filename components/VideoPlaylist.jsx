'use client';

import { useEffect, useState } from 'react';

export default function VideoPlaylist({ courseId }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${courseId}`);
        const data = await res.json();
        setVideos(data);
        setSelectedVideo(data[0]); // set first video by default
      } catch (error) {
        console.error("Failed", error);
        
      }
    }
    fetchVideos();
  }, [courseId]);

  return (
    <div className='px-3'>
      <div className="row">
        {/* Video Player */}
        <div className="col-md-9">
          {selectedVideo && (
            <div className="ratio ratio-16x9 mb-3">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          )}
          <h5>{selectedVideo?.title}</h5>
          <p>{selectedVideo?.description}</p>
        </div>

        {/* Playlist */}
        <div className="col-md-3">
          <h6 className="mb-3">Playlist</h6>
          <ul className="list-group">
            {videos.map((video,i) => (
              <li
                key={video._id}
                className={`list-group-item list-group-item-action ${selectedVideo?._id === video._id ? 'active' : '' }`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedVideo(video)}>
                <span>{i+1} - </span>
                {video.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
