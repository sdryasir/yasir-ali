"use client"
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useUser } from '@/contexts/UserContext';

export default function PersonalInfo() {
  // const session = await getServerSession(authOptions)
  //   if (!session) return <p>Access denied</p>
  const user = useUser();
  if (!user) return <p>Loading...</p>;
    
  return (
    <div className="card shadow-sm">
      <div className="card-header">Personal Information</div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" defaultValue={user.fullName} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email <small className='text-small text-danger'>({user.provider=='google' ?"You cannot update email, when you use  google sign in":""})</small></label>
            <input type="email" disabled={user.provider=='google'} className="form-control" defaultValue={user.email} />
          </div>
          <button type="submit" className="btn btn-primary">Update Info</button>
        </form>
      </div>
    </div>
  );
}
