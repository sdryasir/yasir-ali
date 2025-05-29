'use client';

import { useState } from 'react';

export default function CreateCourseForm({ categories, onSubmit }) {
  const [tags, setTags] = useState(['']);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [slug, setSlug] = useState('');

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const addTag = () => setTags([...tags, '']);
  const removeTag = (index) => setTags(tags.filter((_, i) => i !== index));

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleTitleChange = (e)=>{
    const title = e.target.value;
    const generatedSlug = title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
    setSlug(generatedSlug);
  }

  

  return (
    <div className="container mt-4">
        <form action={onSubmit} className="p-4 w-75 bg-light border rounded shadow-sm">
            <h3 className="mb-4">Create New Course</h3>

            <div className="mb-3">
                <label className="form-label">Title</label>
                <input name="title" onChange={handleTitleChange} type="text" required className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label">Slug</label>
                <input name="slug" type="text" value={slug} readOnly required className="form-control" />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" required className="form-control" rows={3}></textarea>
            </div>

            <div className="mb-3">
                <label className="form-label">Instructor</label>
                <input name="instructor" type="text" required className="form-control" />
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                <label className="form-label">Price</label>
                <input name="price" type="number" min={0} required className="form-control" />
                </div>
                <div className="col-md-6">
                <label className="form-label">Duration</label>
                <input name="duration" type="text" className="form-control" placeholder="e.g., 12 Weeks" />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Level</label>
                <select name="level" className="form-select" required>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Category</label>
                <select name="category" className="form-select" required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Tags</label>
                {tags.map((tag, index) => (
                <div className="input-group mb-2" key={index}>
                    <input
                    type="text"
                    name="tags[]"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="form-control"
                    placeholder="Enter tag"
                    />
                    {index > 0 && (
                    <button type="button" className="btn btn-outline-danger" onClick={() => removeTag(index)}>Remove</button>
                    )}
                </div>
                ))}
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={addTag}>+ Add Tag</button>
            </div>

            <div className="mb-3">
                <label className="form-label">Thumbnail</label>
                <input type="file" name="thumbnail" accept="image/*" className="form-control" onChange={handleThumbnailChange} />
                {thumbnailPreview && (
                <img src={thumbnailPreview} alt="Preview" className="img-thumbnail mt-2" width={150} />
                )}
            </div>

            <button type="submit" className="btn btn-primary">Create Course</button>
            </form>
    </div>
  );
}
