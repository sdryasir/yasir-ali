import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function PersonalInfo() {
  const session = await getServerSession(authOptions)
    if (!session) return <p>Access denied</p>
  return (
    <div className="card shadow-sm">
      <div className="card-header">Personal Information</div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" defaultValue={session.user.name} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" defaultValue={session.user.email} />
          </div>
          <button type="submit" className="btn btn-primary">Update Info</button>
        </form>
      </div>
    </div>
  );
}
