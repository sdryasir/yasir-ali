"use client"
import { useUser } from '@/contexts/UserContext';
import moment from 'moment';

export default function AccountDetails() {
  const user = useUser();

  if (!user) return <p>Loading...</p>;

    const humanReadableDate = (date, showTime=false)=>{
      return moment(date).format(`MMMM Do YYYY ${showTime ? 'hh:mm:ss A':''}`);
    }

  return (
    <div className="card shadow-sm">
      <div className="card-header">Account Details</div>
      <div className="card-body">
        <p><strong>Joined:</strong> {humanReadableDate(user.createdAt)}</p>
        <p><strong>Status:</strong> <span className={`${user.isActive? 'text-success': 'text-danger'} fw-bold`}>{user.isActive?'Active':'Inactive'}</span></p>
        <p><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
        <hr />
        <h5 className='my-2'>Login History <small className='text-muted fw-light text-small'>(Last 5 logins)</small></h5>
        <ul className='list-unstyled'>
          {
            user?.loginHistory.map(history=>(
              <li key={history._id} className='mb-2 p-3 bg-light'>
                <p className='m-0 fw-light fw-italic'><strong>Location/IP</strong>: {history?.location? history.location:history.ip}</p>
                <p className='m-0 fw-light fw-italic' style={{cursor: 'pointer'}} title={history.userAgent}><strong>User Agent</strong>: {history.userAgent.slice(0, 70)}...</p>
                <p className='m-0 fw-light fw-italic'><strong>Time</strong>: {humanReadableDate(history.date, true)}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
