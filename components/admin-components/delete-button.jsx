'use client';
import { useState } from 'react';

export default function DeleteButton({ id, action }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      {confirming ? (
        <form action={action}>
          <input type="hidden" name="id" value={id} />
          <p className="text-sm mb-2">Are you sure you want to delete?</p>
          <button
            type="submit"
            className="btn btn-danger"
          >
            Yes, Delete
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => setConfirming(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="btn btn-danger"
        >
          Delete
        </button>
      )}
    </>
  );
}
