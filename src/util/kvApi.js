export const fetchPosts = async () => {
  const response = await fetch(`/posts`);
  if(!response.ok) {
    throw new Error(`An Error has occured: ${response.status}`)
  }
  const data = await response.json()
  return data.posts.sort((a, b) => b.time - a.time);
}

export const postPosts = async (postObject) => {
  const response = await fetch(`/posts`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: postObject
  })
  if(!response.ok) {
    return 'An error has occured. Please repost.'
  } else {
    return 'Post Successful!'
  }
}
