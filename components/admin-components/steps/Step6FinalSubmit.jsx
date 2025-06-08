'use client';

export default function Step6FinalSubmit({ data, goBack, onSubmit, isSubmitting }) {
  return (
    <div>
      <h4>Review Your Course Details</h4>
      <pre className="bg-light p-3 rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {JSON.stringify(data, null, 2)}
      </pre>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={goBack} disabled={isSubmitting}>
          Back
        </button>
        <button className="btn btn-success" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
