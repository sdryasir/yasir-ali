import InnerPageHeader from '@/components/InnerPageHeader'
import React from 'react'
import { getCategories } from '@/lib/commonFunctions'
import Link from 'next/link';

async function Page() {
  const categories = await getCategories();
    if (!categories) return <p>Loading categories...</p>;
  return (
    <div>
        <InnerPageHeader title="Categories"/>
        {categories.length === 0 ? (
          <div className="container my-5">
            <p>No categories found.</p>
          </div>
        ) : (
          <div className="categories-wrapper">
            <div className="container my-5">
                <div className="row">
                {categories.map((category) => (
                    <div key={category._id} className="col-md-3 mb-4">
                    <Link href={`/categories/${category.slug}`} className="card h-100 shadow-sm text-decoration-none">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{category.name}</h5>
                            <p className="card-text">{category.description}</p>
                            {/* <button className="btn btn-action">View Courses</button> */}
                        </div>
                    </div>
                    </Link>
                    </div>
                ))}
                </div>              
            </div>
          </div>
        )}
    </div>
  )
}

export default Page