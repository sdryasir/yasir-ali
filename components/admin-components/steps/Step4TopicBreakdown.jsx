'use client';

import { useState, useEffect } from 'react';

export default function Step4TopicBreakdown({ data, update, goNext, goBack }) {
  const [topics, setTopics] = useState(data.topicBreakdown);

  useEffect(() => {
    update({ topicBreakdown: topics });
  }, [topics]);

  const handleChange = (index, field, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = { ...updatedTopics[index], [field]: value };
    setTopics(updatedTopics);
  };

  const handleVideoChange = (topicIndex, videoIndex, field, value) => {
    const updatedTopics = [...topics];
    const updatedVideos = [...updatedTopics[topicIndex].videos];
    updatedVideos[videoIndex] = { ...updatedVideos[videoIndex], [field]: value };
    updatedTopics[topicIndex].videos = updatedVideos;
    setTopics(updatedTopics);
  };

  const addVideo = (topicIndex) => {
    const updatedTopics = [...topics];
    if (!updatedTopics[topicIndex].videos) {
      updatedTopics[topicIndex].videos = [];
    }
    updatedTopics[topicIndex].videos.push({
      title: '',
      link: '',
      videoLength: '',
      previewAvailable: false,
    });
    setTopics(updatedTopics);
  };

  const removeVideo = (topicIndex, videoIndex) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].videos = updatedTopics[topicIndex].videos.filter((_, i) => i !== videoIndex);
    setTopics(updatedTopics);
  };

  const addTopic = () =>
    setTopics([
      ...topics,
      {
        topicTitle: '',
        videos: [
          {
            title: '',
            link: '',
            videoLength: '',
            previewAvailable: false,
          },
        ],
        githubLink: '',
        assignmentTitle: '',
      },
    ]);

  const removeTopic = (index) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (topics.length === 0) {
          alert('Add at least one topic.');
          return;
        }
        for (const topic of topics) {
          if (!topic.topicTitle) {
            alert('Each topic must have a title.');
            return;
          }
        }
        goNext();
      }}
    >
      {topics.map((topic, i) => (
        <div key={i} className="border p-3 mb-3 rounded">
          <h5>
            Topic {i + 1}{' '}
            {i > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger float-end"
                onClick={() => removeTopic(i)}
              >
                Remove
              </button>
            )}
          </h5>

          <div className="mb-3">
            <label className="form-label">Topic Title *</label>
            <input
              type="text"
              className="form-control"
              value={topic.topicTitle}
              onChange={(e) => handleChange(i, 'topicTitle', e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Videos</label>
            {topic.videos?.map((video, vIndex) => (
              <div key={vIndex} className="border p-3 mb-3 rounded bg-light">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Video Title"
                  value={video.title}
                  onChange={(e) => handleVideoChange(i, vIndex, 'title', e.target.value)}
                />
                <input
                  type="url"
                  className="form-control mb-2"
                  placeholder="Video Link (https://...)"
                  value={video.link}
                  onChange={(e) => handleVideoChange(i, vIndex, 'link', e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Video Length (e.g., 12 min)"
                  value={video.videoLength}
                  onChange={(e) => handleVideoChange(i, vIndex, 'videoLength', e.target.value)}
                />
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`preview-${i}-${vIndex}`}
                    checked={video.previewAvailable}
                    onChange={(e) => handleVideoChange(i, vIndex, 'previewAvailable', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor={`preview-${i}-${vIndex}`}>
                    Preview Available
                  </label>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeVideo(i, vIndex)}
                >
                  Remove Video
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={() => addVideo(i)}
            >
              + Add Video
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label">GitHub Link</label>
            <input
              type="text"
              className="form-control"
              value={topic.githubLink}
              onChange={(e) => handleChange(i, 'githubLink', e.target.value)}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Assignment Title</label>
            <input
              type="text"
              className="form-control"
              value={topic.assignmentTitle}
              onChange={(e) => handleChange(i, 'assignmentTitle', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button type="button" className="btn btn-sm btn-outline-primary mb-3" onClick={addTopic}>
        + Add Topic
      </button>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={goBack}>
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </div>
    </form>
  );
}
