'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <button className="btn btn-danger" onClick={() => signOut({ callbackUrl: '/login' })}>
      Logout
    </button>
  )
}
