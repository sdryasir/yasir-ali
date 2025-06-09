'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState('Verifying...');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verify = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${token}`);
      const data = await res.json();
      setStatus(data.message);
    };
    if (token) verify();
  }, [token]);

  return (
    <div className="container mt-5">
      <div className='alert alert-info'>
        <h4>Email Verification</h4>
        <p>{status}</p>
      </div>
      <p>
        {status === 'Email verified successfully' ? (
          <a href="/auth/login" className="btn btn-primary">Login</a>
        ) : (
          <a href="/" className="btn btn-secondary">Go to Home</a>
        )}
      </p>
    </div>
  );
}
