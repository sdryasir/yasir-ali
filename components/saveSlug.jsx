'use client'

import { useEffect } from 'react'
import saveSlug  from '@/actions/saveSlug'

export default function SaveSlugClient({ slug }) {
  useEffect(() => {
    if (slug) saveSlug(slug)
  }, [slug])

  return null
}
