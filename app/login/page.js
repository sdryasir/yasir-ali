'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="mb-4">Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
              <input className="form-control mb-3" placeholder="Username"
                value={username} onChange={(e) => setUsername(e.target.value)} />
              <input className="form-control mb-3" type="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="btn btn-primary w-100" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
