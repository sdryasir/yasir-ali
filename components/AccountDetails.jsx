"use client"
import { useUser } from '@/contexts/UserContext';
import moment from 'moment';

export default function AccountDetails() {
  const user = useUser();

  if (!user) return <p>Loading...</p>;

  const readableDate = moment(user.createdAt).format('MMMM Do YYYY');
  return (
    <div className="card shadow-sm">
      <div className="card-header">Account Details</div>
      <div className="card-body">
        <p><strong>Joined:</strong> {readableDate}</p>
        <p><strong>Status:</strong> <span className={`${user.isActive? 'text-success': 'text-danger'} fw-bold`}>{user.isActive?'Active':'Inactive'}</span></p>
        <p><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
      </div>
    </div>
  );
}
