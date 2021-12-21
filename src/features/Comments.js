import { useState } from 'react';
import { postPosts } from '../util/kvApi';
import { v4 as uuidv4 } from 'uuid';

function Comments(props) {

  // Sorts comments into order of posting, newest first.
  const comments = props.post.comments.sort((a, b) => b.time - a.time);

  // Manages comment section states.
  const [user, setUser] = useState('');
  const [newComment, setNewComment] = useState('');
  const [viewComments, setViewComments] = useState(false);

  // Handles states changes.
  const handleUserChange = (e) => setUser(e.target.value);
  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleViewComments = (e) => setViewComments(prev => !prev);

  // Constructs comment object and pushes to KV store.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && newComment) {
      const commentObject = {id: uuidv4(), userName: user, textContent: newComment, time: Date.now()}
      props.post.comments.push(commentObject);
      const response = await postPosts(props.post);
      alert(response);
      if (response === 'Post Successful') {
        setNewComment('');
      }
    } else {
      alert(`Please complete all fields`);
    }
  }

  // Pushes likes to KV store. Rerenders post.
  const incrementLikes = async () => {
    props.post.likes++;
    await postPosts(props.post);
    await props.updatePosts();
  }

  // Renders comments.
  return (
    <div className='commentContainer'>
      <button id='likeButton' onClick={incrementLikes}>&#128077; {props.post.likes} Likes</button><hr/>
      {comments.length === 0 ? <p>No comments to display</p> : 
      <div className='commentFeed' key={comments.id}>
        {!viewComments ? <p>{comments.length} comment{comments.length > 1 ? 's' : null}</p> : null}
        {viewComments ? <h5>Comments:</h5> : <button onClick={handleViewComments}>View Comments</button>}
        {viewComments && comments.map(x => {
          return <div className='comment' key={x.id}>
            <p>-{'>'} {x.userName} says {x.textContent}</p>
          </div>
        })}
        {viewComments ? <button onClick={handleViewComments}>Hide Comments</button> : null}
      </div>}
      <div className='commentForm'>
        <p>Leave a comment</p>
        <form onSubmit={handleSubmit}>
          <label>Your Name: <input type='text' value={user} onChange={handleUserChange} placeholder='Joe Bloggs'></input></label>
          <label>Comment: <input type='text' value={newComment} onChange={handleCommentChange} placeholder='Still got my umbrella!'></input></label>
          <button type='submit'>Post Comment</button>
        </form>
      </div>
    </div>  
  )  
}

export default Comments;
