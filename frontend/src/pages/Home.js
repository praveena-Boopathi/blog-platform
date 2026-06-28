import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <div>
      <div className="hero">
        <h1>Welcome to BlogSpace</h1>
        <p>Discover stories, ideas, and perspectives from writers on any topic.</p>
        {!user && (
          <button className="btn btn-primary" onClick={() => navigate('/register')}>
            Start Writing Today
          </button>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <h3>No posts yet</h3>
          <p>Be the first to write something!</p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post._id} className="post-card" onClick={() => navigate(`/post/${post._id}`)}>
              <div className="post-card-body">
                <h3 className="post-card-title">{post.title}</h3>
                <p className="post-card-excerpt">{post.excerpt}</p>
                {post.tags?.length > 0 && (
                  <div className="tags">
                    {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                )}
                <div className="post-card-meta">
                  <span>By {post.author?.username}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
