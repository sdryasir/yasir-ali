// app/loading.js
export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loading-overlay">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 fs-5">Please wait while the page loads...</p>
      </div>
    </div>
  );
}
