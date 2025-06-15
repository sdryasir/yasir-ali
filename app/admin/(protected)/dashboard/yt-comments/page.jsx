'use client';

import { useState } from 'react';

export default function FetchCommentsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchComments = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-comments`);
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Comments fetched successfully!');
      } else {
        setMessage(data.error || 'Failed to fetch comments.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-5' style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Fetch YouTube Comments</h1>
      <button
        onClick={fetchComments}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Fetching...' : 'Fetch Comments'}
      </button>

      {message && (
        <p style={{ marginTop: '1rem', color: loading ? 'gray' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
}
