// Requests post data from worker. Returns an array of posts sorted by time.
export const fetchPosts = async () => {
  const response = await fetch(`/posts`);
  if(!response.ok) {
    throw new Error(`An Error has occured: ${response.status}`);
  }
  const data = await response.json()
  return data.posts.sort((a, b) => b.time - a.time);
}

// Sends new or updated posts to the worker to add to KV.
export const postPosts = async (postObject) => {
  const postJSON = JSON.stringify(postObject);
  const response = await fetch(`/posts/${postObject.id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: postJSON
  })
  if(!response.ok) {
    throw new Error(`An Error has occured: ${response.status}`);
  } else {
    return 'Post Successful!'
  }
}
