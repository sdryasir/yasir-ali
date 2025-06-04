import VideoPlaylist from '@/components/VideoPlaylist';
import React, { Suspense } from 'react'

async function Page({params}) {
    const id = (await params).id;
  return (
    <div>
        <Suspense fallback="Loading...">
          <VideoPlaylist courseId={id}/>
        </Suspense>
    </div>
  )
}

export default Page