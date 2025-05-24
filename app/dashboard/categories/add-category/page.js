'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCategoryPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`✅ Image uploaded:`);
      router.push('/dashboard/categories');
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Category</h2>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0] || null)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
