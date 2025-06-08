export const dynamic = "force-dynamic";
import CourseApplicationForm from '@/components/CourseApplicationForm'
import InnerPageHeader from '@/components/InnerPageHeader'
import React from 'react'
import { getTrainings } from '@/lib/commonFunctions'

async function Page() {
  const trainings = await getTrainings();

  return (
    <>
        <InnerPageHeader title="Apply Online"/>
        <div className='container py-5'>
          <div className="row">
            <div className="col-md-6 bg-light p-3 border-3 border-secondary rounded">
              <div className="course-schedule">
                <h3 className='mb-4 text-uppercase text-muted'>Apply for Upcoming New Batch</h3>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <caption>New batch schedule</caption>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Course</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">Mode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        trainings.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">No upcoming batches available</td>
                          </tr>
                        ) : (
                          trainings.map((training, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{training.title}</td>
                              <td>--</td>
                              <td>{training.features.mode}</td>
                            </tr>
                          ))
                        )}
                    </tbody>
                  </table>
                </div>
                <p className='mb-4'>Fill out the form below to apply for the upcoming batch of your chosen course. We will get back to you with further details.</p>
                <p className='mb-4'>If you have any questions, feel free to contact us at <a href="mailto:sdr.yasir@gmail.com">info@easylearn.pk</a>.</p>
              </div>
            </div>
            <div className="col-md-6">
              <CourseApplicationForm/>
            </div>
          </div>
        </div>
    </>
  )
}

export default Page