import VideoPlaylist from '@/components/VideoPlaylist';
import React from 'react'

async function Page({params}) {
    const id = (await params).id;
  return (
    <div>
        <VideoPlaylist courseId={id}/>
    </div>
  )
}

export default Page