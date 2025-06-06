// app/loading.js
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <Skeleton count={1} height={300} />
          <Skeleton count={6} height={20} className="mt-3" />
        </div>
      </div>
    </div>
    
  );
}


{/* // <div className="d-flex justify-content-center align-items-center vh-100 loading-overlay">
    //   <div className="text-center">
    //     <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
    //       <span className="visually-hidden">Loading...</span>
    //     </div>
    //     <p className="mt-3 fs-5">Please wait while the page loads...</p>
    //   </div>
    // </div> */}