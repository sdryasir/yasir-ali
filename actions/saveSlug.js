'use server'

import { cookies } from 'next/headers'

export default async function SaveSlugClient(slug) {
  cookies().set('courseSlug', slug, {
    httpOnly: false, // Optional: make true if you don’t need client access
  })
}
