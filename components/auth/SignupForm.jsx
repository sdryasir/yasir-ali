'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
        setLoading(false);
      }

      setSuccess('Account created successfully, To activate your account, please check your email for the verification link.');
      setFormData({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'student',
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Signup</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            name="fullName"
            type="text"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            type="text"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            className="form-select"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn btn-action w-100">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        <Link href="/auth/login" className="d-block text-center mt-3">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}
