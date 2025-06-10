import EnrollPage from '@/components/EnrollPage'
import React from 'react'

async function Page({params}) {
  const id = (await params).id;
  return (
    <div>
      <EnrollPage courseId={id}/>
    </div>
  )
}

export default Page