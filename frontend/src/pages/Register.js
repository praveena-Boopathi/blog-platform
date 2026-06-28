import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const res = await API.post('/api/auth/register', form);
      login(res.data.user, res.data.token);
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required placeholder="johndoe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Min 6 characters" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#6366f1' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
