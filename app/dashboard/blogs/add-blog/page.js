'use client'
import { useState } from 'react'
import TiptapEditor from '@/components/admin-components/TipTapEditor'
import { useRouter } from "next/navigation";

export default function BlogEditorPage() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("status", status);
  
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`,
          {
            method: "POST",
            body: formData,
          }
        );
  
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setMessage(`✅ Image uploaded:`);
          router.push("/dashboard/blogs");
        } else {
          setLoading(false);
          setMessage(`❌ Error: ${data.error}`);
        }
      } catch (error) {
        console.error("failed", error);
      }
    };
  
    const handleTitle = (e) => {
      const title = e.target.value;
      setTitle(title);
      const generatedSlug = title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, "-");
      setSlug(generatedSlug);
    };


  return (
    <div className="container mt-5">
      <h2>Add New Blog</h2>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Blog Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleTitle}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Slug</label>
          <input
            type="text"
            className="form-control"
            value={slug}
            readOnly
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Blog Content</label>
          <TiptapEditor onChange={setContent} />
          
        </div>
        <div className="mb-3">
          <label className="form-label">Main Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0] || null)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Public Status (want to show publicly)
          </label>
          <select name="status" value={status} onChange={(e)=>setStatus(e.target.value)} className="form-select" required>
            <option value="">Select Status</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading ? true : false}
          className="btn btn-primary"
        >
          {loading ? "Saving..." : "Add"}
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  )
}