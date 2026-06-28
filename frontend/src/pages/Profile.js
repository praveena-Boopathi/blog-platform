import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/api/posts');
        setMyPosts(res.data.filter(p => p.author?._id === user?._id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>👤 {user?.username}</h2>
            <p style={{ color: '#64748b', marginTop: '0.3rem' }}>{user?.email}</p>
          </div>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <h3 className="page-title">My Posts ({myPosts.length})</h3>
      {myPosts.length === 0 ? (
        <div className="empty-state">
          <p>You haven't written any posts yet.</p>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/create')}>
            Write Your First Post
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {myPosts.map(post => (
            <div key={post._id} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/post/${post._id}`)}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.3rem' }}>{post.title}</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{post.excerpt}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
