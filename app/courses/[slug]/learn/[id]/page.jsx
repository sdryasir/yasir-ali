import VideoPlaylist from "@/components/VideoPlaylist";
import React, { Suspense } from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

async function Page({ params }) {
  const id = (await params).id;
  const slug = cookies().get('courseSlug')?.value
  const session = await getServerSession(authOptions);
  if (!session) {
    const callbackUrl = `/courses/${slug}/learn/${id}`;
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  return (
    <div>
      <Suspense fallback="Loading...">
        <VideoPlaylist courseId={id} />
      </Suspense>
    </div>
  );
}

export default Page;
