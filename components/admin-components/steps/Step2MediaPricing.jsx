'use client';

import { useState, useEffect } from 'react';

export default function Step2MediaPricing({ data, update, goNext, goBack }) {
  const [thumbnailPreview, setThumbnailPreview] = useState(data.thumbnail ? URL.createObjectURL(data.thumbnail) : null);

  useEffect(() => {
    if (data.thumbnail && typeof data.thumbnail === 'string') {
      setThumbnailPreview(data.thumbnail);
    }
  }, [data.thumbnail]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      update({ thumbnail: file });
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!data.price || !data.duration || !data.instructor) {
          alert('Please fill all required fields.');
          return;
        }
        goNext();
      }}
    >
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Thumbnail</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleThumbnailChange} />
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="Thumbnail Preview" className="img-thumbnail mt-2" width={150} />
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Intro Video URL</label>
          <input
            type="url"
            className="form-control"
            value={data.introVideo}
            onChange={(e) => update({ introVideo: e.target.value })}
            placeholder="https://..."
          />
        </div>

          <div className="col-md-6">
            <label className="form-label">Price *</label>
            <input
              type="number"
              min={0}
              className="form-control"
              value={data.price}
              onChange={(e) => update({ price: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Discounted Price</label>
            <input
              type="number"
              min={0}
              className="form-control"
              value={data.discountedPrice}
              onChange={(e) => update({ discountedPrice: e.target.value })}
              placeholder="Optional"
            />
          </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Duration</label>
          <input
            type="text"
            className="form-control"
            value={data.duration}
            onChange={(e) => update({ duration: e.target.value })}
            placeholder="e.g., 12 Weeks"
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Instructor *</label>
          <input
            type="text"
            className="form-control"
            value={data.instructor}
            onChange={(e) => update({ instructor: e.target.value })}
            required
          />
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
