'use client';

import { useState, useEffect } from 'react';

export default function Step4WeeklyBreakdown({ data, update, goNext, goBack }) {
  const [weeklyBreakdown, setWeeklyBreakdown] = useState(data.weeklyBreakdown);

  useEffect(() => {
    update({ weeklyBreakdown });
  }, [weeklyBreakdown]);

  const handleChange = (index, field, value) => {
    const updatedWeeks = [...weeklyBreakdown];
    updatedWeeks[index] = { ...updatedWeeks[index], [field]: value };
    setWeeklyBreakdown(updatedWeeks);
  };

  const addWeek = () =>
    setWeeklyBreakdown([...weeklyBreakdown, { weekTitle: '', description: '', githubLink: '', assignmentTitle: '' }]);

  const removeWeek = (index) => {
    setWeeklyBreakdown(weeklyBreakdown.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (weeklyBreakdown.length === 0) {
          alert('Add at least one week.');
          return;
        }
        // validate weekTitle required
        for (const week of weeklyBreakdown) {
          if (!week.weekTitle) {
            alert('Each week must have a title.');
            return;
          }
        }
        goNext();
      }}
    >
      {weeklyBreakdown.map((week, i) => (
        <div key={i} className="border p-3 mb-3 rounded">
          <h5>
            Week {i + 1}{' '}
            {i > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger float-end"
                onClick={() => removeWeek(i)}
              >
                Remove
              </button>
            )}
          </h5>

          <div className="mb-3">
            <label className="form-label">Week Title *</label>
            <input
              type="text"
              className="form-control"
              value={week.weekTitle}
              onChange={(e) => handleChange(i, 'weekTitle', e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={2}
              value={week.description}
              onChange={(e) => handleChange(i, 'description', e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">GitHub Link</label>
            <input
              type="url"
              className="form-control"
              value={week.githubLink}
              onChange={(e) => handleChange(i, 'githubLink', e.target.value)}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Assignment Title</label>
            <input
              type="text"
              className="form-control"
              value={week.assignmentTitle}
              onChange={(e) => handleChange(i, 'assignmentTitle', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button type="button" className="btn btn-sm btn-outline-primary mb-3" onClick={addWeek}>
        + Add Week
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
