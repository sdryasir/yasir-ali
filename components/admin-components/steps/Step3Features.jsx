'use client';

import { useState, useEffect } from 'react';

export default function Step3Features({ data, update, goNext, goBack }) {
  const [features, setFeatures] = useState(data.features);

  useEffect(() => {
    update({ features });
  }, [features]);

  const handlePrerequisiteChange = (index, value) => {
    const newPre = [...features.prerequisites];
    newPre[index] = value;
    setFeatures((prev) => ({ ...prev, prerequisites: newPre }));
  };

  const addPrerequisite = () => setFeatures((prev) => ({ ...prev, prerequisites: [...prev.prerequisites, ''] }));

  const removePrerequisite = (index) => {
    const newPre = features.prerequisites.filter((_, i) => i !== index);
    setFeatures((prev) => ({ ...prev, prerequisites: newPre }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (features.mode === 'Online' || features.mode === 'Physical' || features.mode === 'Hybrid') {
          goNext();
        } else {
          alert('Select mode');
        }
      }}
    >
      <div className="row">
        <div className="col-md-3 mb-3">
          <label className="form-label">Mode *</label>
          <select
            className="form-select"
            value={features.mode}
            onChange={(e) => setFeatures((prev) => ({ ...prev, mode: e.target.value }))}
            required
          >
            <option value="Online">Online</option>
            <option value="Physical">Physical</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <label className="form-label">Access Type *</label>
          <select
            className="form-select"
            value={features.accessType}
            onChange={(e) => setFeatures((prev) => ({ ...prev, accessType: e.target.value }))}
            required
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        

        <div className="col-md-3 mb-3">
          <label className="form-label">Start Type *</label>
          <select
            className="form-select"
            value={features.startType}
            onChange={(e) => setFeatures((prev) => ({ ...prev, startType: e.target.value }))}
            required
          >
            <option value="Expected Date">Expected Date</option>
            <option value="On Demand">On Demand</option>
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <label className="form-label">Language</label>
          <input
            type="text"
            className="form-control"
            value={features.language}
            onChange={(e) => setFeatures((prev) => ({ ...prev, language: e.target.value }))}
            placeholder="e.g., English"
          />
        </div>

        {features.startType === 'Expected Date' && (
          <div className="mb-3">
            <label className="form-label">Expected Start Date</label>
            <input
              type="date"
              className="form-control"
              value={features.expectedStartDate ? features.expectedStartDate.split('T')[0] : ''}
              onChange={(e) => setFeatures((prev) => ({ ...prev, expectedStartDate: e.target.value }))}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Prerequisites</label>
          {features.prerequisites.map((pre, i) => (
            <div key={i} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={pre}
                onChange={(e) => handlePrerequisiteChange(i, e.target.value)}
                placeholder="Enter prerequisite"
              />
              {i > 0 && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removePrerequisite(i)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={addPrerequisite}>
            + Add Prerequisite
          </button>
        </div>

        
        <div className="col-md-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="recordingAvailable"
              checked={features.recordingAvailable}
              onChange={(e) => setFeatures((prev) => ({ ...prev, recordingAvailable: e.target.checked }))}
            />
            <label className="form-check-label" htmlFor="recordingAvailable">
              Recording Available
            </label>
          </div>
        </div>
        

      </div>
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
