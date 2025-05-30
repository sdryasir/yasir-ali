import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { revalidatePath } from 'next/cache';
import DeleteButton from '@/components/admin-components/delete-button';


async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    return res.json();
  } catch (error) {
    console.error("failed fetch###", error);
    
  }
}



async function Categories() {
  const categories = await getCategories();

  

   async function deleteCategory(id) {
    'use server';

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const text = await res.text();
        console.log('RESPONSE TEXT:', text);
        throw new Error(`Delete failed: ${res.status}\n${text}`);
      }

      revalidatePath('/dashboard/categories');
    } catch (error) {
      console.error("failed to delete category", error);
      
    }
  }

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between mb-3'>
        <h2>Course Categories</h2>
        <Link className='btn btn-success' href={'/dashboard/categories/add-category'}>Add Category</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
           <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Slug</th>
              <th scope="col">Status</th>
              <th scope="col">Image</th>
              <th scope="col" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>

            {
              categories.map((cat,i)=>{
                return (
                <tr key={cat._id}>
                  <th scope="row">{i+1}</th>
                  <td>{cat.name}</td>
                  <td>{cat.slug ? cat.slug:'no slug'}</td>
                  <td>{cat.status}</td>
                  <td>
                    {
                      cat.imageUrl?<Image src={cat.imageUrl} alt={cat.name} width={100} height={50}/>:'No Image'
                    }
                  </td>
                  <td width={300}>
                    <DeleteButton
                      id={cat._id}
                      action={deleteCategory.bind(null, cat._id)}
                    />
                  </td>
                  {/* <td width={300}>
                      <Link href={`/dashboard/categories/edit-category/${cat._id}`}>
                        <button className="btn btn-sm btn-info">Edit</button>
                      </Link>
                  </td> */}
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