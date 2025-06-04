'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function VideoPlaylist({ courseId }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState()

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/videos/${courseId}`);
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) throw new Error('Invalid video data');
        setVideos(data);
        setSelectedVideo(data[0]); // set first video by default
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    }
    fetchVideos();
  }, [courseId]);

  const handleGenerateQuiz = async (videoUrl) => {    
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transcribe-youtube`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });

      const data = await res.json();
      if (!data.transcript) throw new Error('No transcript returned');      
      // Now send transcript to OpenAI for quiz
      const quizRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: data.transcript }),
      });

      const quizData = await quizRes.json();
      setQuiz(quizData.quiz);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container py-5">Loading...</div>;

  if (videos.length === 0 && !loading) return (
    <div className="container py-5">
      <p className='fw-bold'>No Video Found in this course</p>
      <Link href={'/'}>Go Back</Link>
    </div>
  );

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
          <button className='btn btn-info' disabled={true} onClick={()=>handleGenerateQuiz(`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`)}>Generate Quiz</button>
          {quiz && (
            <div className="mt-4">
              <h4>Quiz:</h4>
              <ul>
                {quiz.map((q, index) => (
                  <li key={index}>
                    <strong>{q.question}</strong>
                    <ul>
                      {q.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                    <p><strong>Answer:</strong> {q.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
                <span className='fw-bold'>{i+1} - {video.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
