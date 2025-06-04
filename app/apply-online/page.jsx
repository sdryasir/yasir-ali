import CourseApplicationForm from '@/components/CourseApplicationForm'
import InnerPageHeader from '@/components/InnerPageHeader'
import React from 'react'

function Page() {
  return (
    <>
        <InnerPageHeader title="Apply Online"/>
        <div className='container py-5'>
          <CourseApplicationForm/>
        </div>
    </>
  )
}

export default Page