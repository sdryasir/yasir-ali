import Faq from '@/components/Faq'
import InnerPageHeader from '@/components/InnerPageHeader'
import React from 'react'

function Page() {
  return (
    <>
      <InnerPageHeader title="FAQs"/>
      <div className='container mt-5'>
          <Faq/>
      </div> 
    </>
  )
}

export default Page