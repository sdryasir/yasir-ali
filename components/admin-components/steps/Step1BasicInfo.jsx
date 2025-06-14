'use client';

import { useState, useEffect } from 'react';
import TiptapEditor from '../TipTapEditor';

export default function Step1BasicInfo({ data, update, categories, goNext }) {
  const [tags, setTags] = useState(data.tags);

  // Update tags on parent when they change
  useEffect(() => {
    update({ tags });
  }, [tags]);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-');
    update({ title, slug });
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const addTag = () => setTags([...tags, '']);
  const removeTag = (index) => setTags(tags.filter((_, i) => i !== index));

  const onChange = (val)=>{
    update({ description: val });    
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!data.title || !data.slug || !data.description || !data.category || !data.level) {
          alert('Please fill all required fields.');
          return;
        }
        goNext();
      }}
    >
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Course Title *</label>
          <input
            type="text"
            className="form-control"
            value={data.title}
            onChange={handleTitleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Slug *</label>
          <input type="text" className="form-control" value={data.slug} readOnly required />
        </div>

        <div className="col-md-12 mb-3">
          <label className="form-label">Short Description</label>
          <textarea
            className="form-control"
            rows={2}
            value={data.shortDescription}
            onChange={(e) => update({ shortDescription: e.target.value })}
          />
        </div>

        <div className="col-md-12 mb-3">
          <label className="form-label">Description *</label>
          <TiptapEditor onChange={onChange}/>
          {/* <textarea
            className="form-control"
            rows={4}
            value={data.description}
            onChange={(e) => update({ description: e.target.value })}
            required
          /> */}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Category *</label>
          <select
            className="form-select"
            value={data.category}
            onChange={(e) => update({ category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Level *</label>
          <select
            className="form-select"
            value={data.level}
            onChange={(e) => update({ level: e.target.value })}
            required
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Tags</label>
          {tags.map((tag, i) => (
            <div key={i} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={tag}
                onChange={(e) => handleTagChange(i, e.target.value)}
                placeholder="Enter tag"
              />
              {i > 0 && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeTag(i)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={addTag}>
            + Add Tag
          </button>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Next
      </button>
    </form>
  );
}
