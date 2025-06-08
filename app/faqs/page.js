import Faq from '@/components/Faq'
import InnerPageHeader from '@/components/InnerPageHeader'
import React from 'react'
import { faqs } from '@/data/data'


function Page() {
  return (
    <>
      <InnerPageHeader title="FAQs"/>
      <div className='container mt-5'>
          <Faq faqs={faqs}/>
      </div> 
    </>
  )
}

export default Page