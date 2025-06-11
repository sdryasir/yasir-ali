'use server'

import { cookies } from 'next/headers'

export default async function SaveSlugClient(slug) {
  await cookies().set('courseSlug', slug, {
    httpOnly: false,
  })
}
