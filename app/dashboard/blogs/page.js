import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import DeleteButton from '@/components/admin-components/delete-button';
import { revalidatePath } from 'next/cache';

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {next: { revalidate: 60 }});

    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }

    return res.json();
  } catch (error) {
    console.error("failed fetch blogs", error);
    
  }
}


async function Page() {
  const blogs = await getBlogs();

  async function deleteBlog(id) {
      'use server';
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`, {
          method: 'DELETE',
        });
  
        if (!res.ok) {
          const text = await res.text();
          console.log('RESPONSE TEXT:', text);
          throw new Error(`Delete failed: ${res.status}\n${text}`);
        }
  
        revalidatePath('/dashboard/blogs');
      } catch (error) {
        console.error("failed to delete category", error);
        
      }
    }

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between mb-3'>
        <h2>Blogs</h2>
        <Link className='btn btn-success' href={'/dashboard/blogs/add-blog'}>Add Blog</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
           <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Image</th>
              <th scope="col" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              blogs.map((blog, i)=>{
                return (
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{blog.title}</td>
                    <td>{blog.status}</td>
                    <td>
                      {
                        blog.imageUrl?<Image src={blog.imageUrl} alt={blog.title} width={100} height={50}/>:'No Image'
                      }
                    </td>
                    <td width={300}>
                      <DeleteButton
                        id={blog._id}
                        action={deleteBlog.bind(null, blog._id)}
                      />
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

export default Page