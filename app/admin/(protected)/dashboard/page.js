import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return <p>Access denied</p>

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {session.user.name}!</p>
      <p>This is your admin dashboard where you can manage categories, courses, videos, and blogs. <strong>Use the navigation bar to access different sections.</strong></p>
    </div>
  )
}
