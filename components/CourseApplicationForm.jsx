'use client';
import Link from 'next/link';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function CourseApplicationForm() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    course: '',
    city: '',
    preference: '',
  });
  const [captcha, setCaptcha] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/course-application`, {
      method: 'POST',
      body: JSON.stringify({ ...formData, captcha }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setMsg(data.message);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="fullname" className="form-control mb-3" required placeholder="Full Name" onChange={handleChange} />
        <input name="email" type="email" className="form-control mb-3" required placeholder="Email" onChange={handleChange} />
        <input name="phone" type="tel" pattern="^[0-9]{10,15}$" className="form-control mb-3" required placeholder="Phone Number" onChange={handleChange} />
        <select name="course" className="form-select mb-3" required onChange={handleChange}>
          <option value="">Select Course</option>
          {['JavaScript', 'MRN Stack', 'ReactJS', 'NEXTJS', 'Python'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input name="city" className="form-control mb-3" required placeholder="City" onChange={handleChange} />
        <select name="preference" className="form-select mb-3" required onChange={handleChange}>
          <option value="">Select Preference</option>
          <option value="online">Online</option>
          <option value="physical">Physical</option>
        </select>
        <ReCAPTCHA sitekey="6LfLC1YrAAAAAMSQrSFT8a0oYx_8iytVBiqoqag8" onChange={setCaptcha} className="mb-3" />
        <button type="submit" className="btn btn-action text-white text-uppercase w-100 rounded-0" style={{height: '54px'}}>Apply Now</button>
        {msg && <p className="mt-3">{msg}</p>}
      </form>
    </div>
  );
}
