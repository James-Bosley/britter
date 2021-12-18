import { useEffect, useState } from 'react';
import { fetchPosts, postPosts } from '../util/kvApi';

function App() {
  
  // Creates user generated states.  
  const [user, setUser] = useState('')
  const [title, setTitle] = useState('')
  const [newPost, setNewPost] = useState('');
  // Creates App generated states. Initialises to an empty array.
  const [posts, setPosts] = useState([]);

  // Loads existing posts on first render so UI is not blocked.
  useEffect(() => {
    const thunk = async () => setPosts(await fetchPosts())
    thunk();
  }, [])
  
  // Handles changes to state.
  const handleUserChange = (e) => setUser(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePostChange = (e) => setNewPost(e.target.value);

  // Creates post object and calls postPosts. Resets entry fields if successful.
  const handleClick = async () => {
    const postObject = JSON.stringify({ userName: user, title: title, textContent: newPost, time: Date.now()});
    const response = await postPosts(postObject);
    alert(response);
    if (response === 'Post Successful!') {
      setNewPost('');
      setPosts(await fetchPosts());
    }
  }

  // User can refresh posts manually.
  const updatePosts = async () => setPosts(await fetchPosts());
  
  // Renders App.
  return (
    <div className="App">
      <h1>Make a New Post</h1>
      <input type='text' value={user} onChange={handleUserChange} placeholder="User"></input>
      <input type='text' value={title} onChange={handleTitleChange} placeholder="What's it About?"></input>
      <input type='text' value={newPost} onChange={handlePostChange} placeholder="It's too hot!"></input>
      <button onClick={handleClick}>Click Me</button>
      <button onClick={updatePosts}>Update Posts</button>
      {console.log(posts)}
      {posts.length === 0 ? <h2>Loading posts...</h2> : <div className='table'>
        <table>
          {posts.map((x, i) => {
            return <tr key={i}>
              <td>{x.userName}</td>
              <td>{x.textContent}</td>
            </tr>
          })}
        </table>
      </div>}
    </div>
  );
}

export default App;
