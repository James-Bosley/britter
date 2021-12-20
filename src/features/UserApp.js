import { useEffect, useState } from 'react';
import { fetchPosts, postPosts } from '../util/kvApi';
import Comments from './Comments';
import { v4 as uuidv4 } from 'uuid';

function App() {
  
  // Creates user generated states.  
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [newPost, setNewPost] = useState('');
  // Creates App generated states. Initialises to an empty array.
  const [posts, setPosts] = useState([]);

  // Loads existing posts on first render so UI is not blocked.
  useEffect(() => {
    const thunk = async () => setPosts(await fetchPosts());
    thunk();
  }, [])
  
  // Handles changes to state.
  const handleUserChange = (e) => setUser(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePostChange = (e) => setNewPost(e.target.value);

  // Creates post object and calls postPosts. Resets entry fields if successful.
  const handleSubmit = async (e) => {
    if (user && title && newPost) {
      e.preventDefault();
      const postObject = {id: uuidv4(), userName: user, title: title, textContent: newPost, time: Date.now(), comments: []};
      const response = await postPosts(postObject);
      alert(response);
      if (response === 'Post Successful') {
        setTitle('');
        setNewPost('');
        setPosts(await fetchPosts());
      }
    } else {
      alert(`Please complete all fields`);
    }
  }

  // User can refresh posts manually.
  const updatePosts = async () => setPosts(await fetchPosts());
  
  // Renders App.
  return (
    <div className="appContainer">
      <form className='newPost' onSubmit={handleSubmit}>
        <h4>Bothered about the weather?</h4>
        <label>User: <input className='form1' type='text' value={user} onChange={handleUserChange} placeholder='Joe Bloggs'></input></label>
        <label>Title: <input className='form2' type='text' value={title} onChange={handleTitleChange} placeholder='The weather...'></input></label>
        <textarea className='form3' rows='4' value={newPost} onChange={handlePostChange} placeholder="It's too hot!"></textarea>
        <button className='form4' type='submit'>Post</button>
      </form>
      <div className='postFeed'>
        <button onClick={updatePosts}>Update Feed</button>
        {posts.length === 0 ? <h4 className='postsContainer'>Loading posts...</h4> : <div className='postsContainer'>
              {posts.map(x => {
                return <div className='post' key={x.id}>
                  <h5>{x.userName} wants to talk about {x.title}</h5>
                  <p>-{'>'} {x.textContent}</p><hr/>
                  {/* Post is sent via props to comment component */}
                  <Comments post={x}/> 
                </div>
              })}
        </div>}
      </div>
    </div>
  );
}

export default App;
