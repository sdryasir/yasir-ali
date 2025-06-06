import CourseApplicationForm from '@/components/CourseApplicationForm'
import InnerPageHeader from '@/components/InnerPageHeader'
import React from 'react'

function Page() {
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
                      <tr>
                        <th scope="row">1</th>
                        <td>MERN Stack</td>
                        <td>07-06-2025</td>
                        <td>Online</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>FrontEnd</td>
                        <td>10-08-2025</td>
                        <td>Physical</td>
                      </tr>
                      
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