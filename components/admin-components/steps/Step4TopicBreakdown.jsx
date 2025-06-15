'use client';

import { useState, useEffect } from 'react';
import TipTapEditorTopic from '../TipTapEditorTopic';

export default function Step4TopicBreakdown({ data, update, goNext, goBack }) {
  const [topics, setTopics] = useState(data.topicBreakdown || []);

  useEffect(() => {
    update({ topicBreakdown: topics });
  }, [topics]);

  const handleChange = (index, field, value) => {
    const updated = [...topics];
    updated[index] = { ...updated[index], [field]: value };
    setTopics(updated);
  };

  const addTopic = () =>
    setTopics([...topics, { topicTitle: '', description: '' }]);

  const removeTopic = (index) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topics.length === 0) return alert('Add at least one topic.');

    for (const topic of topics) {
      if (!topic.topicTitle || !topic.description) {
        return alert('Each topic must have a title and description.');
      }
    }

    goNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      {topics.map((topic, i) => (
        <div key={i} className="border p-3 mb-3 rounded bg-light">
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
            <label className="form-label">Description *</label>
            <TipTapEditorTopic
              value={topic.description}
              onChange={(html) => handleChange(i, 'description', html)}
              placeholder="Write topic details..."
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
