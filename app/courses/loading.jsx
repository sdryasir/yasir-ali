import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Page() {
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
