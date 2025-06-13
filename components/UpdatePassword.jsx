"use client"
import { useUser } from "@/contexts/UserContext";

export default function UpdatePassword() {
  const user = useUser();
  if (!user) return <p>Loading...</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-header">Change Password</div>
      <div className="card-body">
      {
        user.provider == 'google' ? <div>
          <p className="text-muted">You can not update the password, as you used google login</p>
        </div>:
        <form>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-warning">Update Password</button>
        </form>
      }
        
      </div>
    </div>
  );
}
