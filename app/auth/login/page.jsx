'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/user-profile'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl
    })

    if (res.ok) {
      router.push(callbackUrl) // or wherever
    } else {
      setError('Invalid credentials or unverified/inactive account.')
    }

    setLoading(false)
  }

  const handleGoogleLogin = async ()=>{
    setLoadingGoogle(true);
    
    await signIn('google',{callbackUrl: '/user-profile'})
  }

  return (
    <div className="container d-flex justify-content-center align-items-center my-5" style={{ minHeight: '60vh' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login to continue learning</h3>

        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username or Email</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <br />
          <button type='button' disabled={loadingGoogle} className='btn btn-outline-primary mt-3 w-100 justify-content-center btn-google d-flex align-items-center' onClick={handleGoogleLogin}>
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Signing in...
              </>
            ) : (
              <>
                <Image src={'/icons/google-icon-logo.svg'} alt='google-logo' width={20} height={20}/> 
                Sign in with Google
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don't have an account? <a href="/auth/signup">Sign up</a>
          </small>
        </div>
      </div>
    </div>
  )
}
