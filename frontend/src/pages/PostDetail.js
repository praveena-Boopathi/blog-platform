import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`/api/posts/${id}`),
          axios.get(`/api/comments/post/${id}`)
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch {
        toast.error('Post not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`/api/posts/${id}`);
      toast.success('Post deleted');
      navigate('/');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleComment = async e => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await axios.post('/api/comments', { content: newComment, postId: id });
      setComments([res.data, ...comments]);
      setNewComment('');
      toast.success('Comment added!');
    } catch {
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch {
      toast.error('Failed to delete comment');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!post) return null;

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: '2rem' }}>
        {post.tags?.length > 0 && (
          <div className="tags">{post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
        )}
        <h1 className="post-detail-title">{post.title}</h1>
        <div className="post-detail-meta">
          By <strong>{post.author?.username}</strong> · {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="post-detail-content">{post.content}</div>

        {user && user._id === post.author?._id && (
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline btn-sm" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>

      {/* Comments */}
      <div className="comments-section">
        <h3 className="comments-title">💬 Comments ({comments.length})</h3>

        {user ? (
          <form onSubmit={handleComment} style={{ marginBottom: '2rem' }}>
            <div className="form-group">
              <textarea
                rows="3"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Post Comment</button>
          </form>
        ) : (
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            <a href="/login" style={{ color: '#6366f1' }}>Login</a> to leave a comment.
          </p>
        )}

        {comments.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No comments yet. Be the first!</p>
        ) : (
          comments.map(comment => (
            <div key={comment._id} className="comment-card">
              <div className="comment-author">@{comment.author?.username}</div>
              <div className="comment-content">{comment.content}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</div>
                {user && user._id === comment.author?._id && (
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetail;
