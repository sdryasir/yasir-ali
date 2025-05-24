import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    cache: 'no-store', // ensures fresh data in RSC
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

async function Categories() {
  const categories = await getCategories();
  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between mb-3'>
        <h2>Course categories</h2>
        <Link className='btn btn-success' href={'/dashboard/categories/add-category'}>Add Category</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
           <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>

            {
              categories.map((cat,i)=>{
                return (
                <tr key={cat._id}>
                  <th scope="row">{i+1}</th>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>
                    {
                      cat.imageUrl?<Image src={cat.imageUrl} alt={cat.name} width={100} height={50}/>:'No Image'
                    }
                  </td>
                </tr>
                )
              })
            }
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Categories