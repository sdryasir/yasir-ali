import React from 'react'
import Link from 'next/link'

function Videos() {
  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between mb-3'>
        <h2>All Videos</h2>
        <Link href={'/admin/dashboard/videos/add-video'} className='btn btn-success'>Add Video</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
           <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>John</td>
              <td>Doe</td>
              <td>@social</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Videos