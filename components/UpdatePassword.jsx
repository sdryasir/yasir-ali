export default function UpdatePassword() {
  return (
    <div className="card shadow-sm">
      <div className="card-header">Change Password</div>
      <div className="card-body">
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
      </div>
    </div>
  );
}
