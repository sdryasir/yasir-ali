import React from 'react'

function page() {
  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between mb-3'>
        <h2>Add New Course</h2>
      </div>
      <form className='w-50'>
        <div className="row mb-3">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
            <input type="email" className="form-control" id="name"/>
            </div>
        </div>
        <div className="row mb-3">
            <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
            <input type="password" className="form-control" id="description"/>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    </div>
  )
}

export default page