'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader, LogIn } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password
    })

    if (res.ok) {
      setLoading(false);
      router.push('/admin/dashboard')
    } else {
      setError('Invalid credentials')
      setLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 position-relative">
            <h3 className="mb-4">Admin Login <LogIn /></h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
              <input className="form-control mb-3" placeholder="Username"
                value={username} onChange={(e) => setUsername(e.target.value)} />
              <input className="form-control mb-3" type="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="btn btn-primary w-100" disabled={loading} type="submit">{loading?'Logging in....':'Login'}</button>
            </form>
            <div className="loading position-absolute" style={{display:`${loading?'block':'none'}`,backgroundColor:'rgba(0,0,0,0.6)', inset:0}}>
              <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}><Loader size={48} color='#fff'/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
