import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await API.post('/api/posts', { ...form, tags });
      toast.success('Post created!');
      navigate(`/post/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <h2 className="page-title">Create New Post</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Enter post title..." />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea name="content" value={form.content} onChange={handleChange} required rows="12" placeholder="Write your post content here..." />
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input type="text" name="tags" value={form.tags} onChange={handleChange} placeholder="e.g. tech, programming, life" />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
