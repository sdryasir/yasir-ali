export const dynamic = "force-dynamic";
import InnerPageHeader from '@/components/InnerPageHeader'
import React from 'react'
import { getTrainings } from '@/lib/commonFunctions';
import Link from 'next/link';
import { slugify } from '@/lib/commonFunctions';
import { ArrowUpRight } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
async function Page() {
  const trainings = await getTrainings();

  return (
    <>
      <InnerPageHeader title={'Live Trainings'} />
      <div className='container mt-5'>
        {trainings.length === 0 ? (
          <p>No live trainings available</p>
        ) : (
            <div className="row">
                {trainings.map((training) => (
                    <div  key={training._id} className="col-md-4">
                        <Link href={`/courses/${slugify(training.title)}`} style={{textDecoration:'none'}}>
                            <div className="card card-course h-100 border-1">
                                <div className="overlay-content">
                                <p className='btn btn-action text-white'>View Course <ArrowUpRight className='icon' size={20} /></p>
                                
                                </div>
                                <div style={{ width: '100%', aspectRatio: '16 / 9', position: 'relative' }}>
                                <SmartImage
                                    src={training.thumbnail}
                                    alt={training.title}
                                    fill
                                    priority
                                    objectFit="cover"
                                />
                                </div>
                                <div className="card-body">
                                    <p className="card-title course-card-title">{training.title}</p>
                                    <ul className='list-unstyled m-0 p-0 course-card-features'>
                                    <li><strong>Duration:</strong> {training.duration} hours</li>
                                    <li>
                                        <strong>Level:</strong> {training.level}
                                    </li>
                                    <li>
                                        <strong>Language:</strong> {training.features.language ? training.features.language : 'N/A'}
                                    </li>
                                    <li>
                                        <strong>Author:</strong> {training.instructor?training.instructor:'N/A'}
                                    </li>
                                    </ul>
                                    
                                </div>
                                <div className="card-footer text-body-secondary d-flex justify-content-between">
                                    <p className='m-0'><small>Updated: <i>2 days ago</i></small></p>
                                    <p className={`card-text fw-bold m-0 ${training.price === 0 ? 'text-danger' : ''}`}>
                                    {training.price === 0 ? 'Free' : `PKR. ${training.price}`}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        )}
      </div>
    </>
  )
}

export default Page