import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setForm({ title: res.data.title, content: res.data.content, tags: res.data.tags.join(', ') });
      } catch {
        toast.error('Post not found');
        navigate('/');
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      await axios.put(`/api/posts/${id}`, { ...form, tags });
      toast.success('Post updated!');
      navigate(`/post/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <h2 className="page-title">Edit Post</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea name="content" value={form.content} onChange={handleChange} required rows="12" />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input type="text" name="tags" value={form.tags} onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate(`/post/${id}`)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
