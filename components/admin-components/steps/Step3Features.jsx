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
        if (features.mode === 'Online') {
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
            <option value="On Demand">On Demand</option>
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <label className="form-label">Language</label>
          <select
            className="form-select"
            value={features.language}
            onChange={(e) => setFeatures((prev) => ({ ...prev, language: e.target.value }))}
            required
          >
            <option value="Urdu">Urdu</option>
            <option value="English">English</option>
          </select>

        </div>


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
