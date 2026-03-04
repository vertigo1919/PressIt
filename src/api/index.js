// I import the API base url from the env variables
// This is allows me to dinamically switch between a local server and the hosted version of the API
// depending on whethere I run npm run build or npm run dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* 
I then use fetch() to talk to the API and interact with the database, an alternative would be third party library axios.
The pattern I follow is similar for all fetch calls, because of this I created util function handleFetchResponse
STEPS (for learning purposes)
1) First I make a request from an end point and I obtain a promise that resolves to a response object.
2) If there's a network failure I am protected because the promise will reject and an error is thrown automatically (I will catch it in the react component that calls this function)
3) The response object contains amongst other details 
    the status code 
    an OK key that is true for  success status or fail for fail status
    a body key the value of which is the content of the response which is a redable stream
4) Because the promise is fulffiled even if OK is false I need to use an if clause guard to thrwo an error if OK is false, I make sure to add to a key of the error the status, 
5) I retrieve the response body as text first to safely handle any status code that might return an empty body (like 204). 
6) I then conditionally parse this text into JSON with ternary operator.
7) Finally I return the relevant data stripping the object it's wrapped in
*/

//  GET all topics > GET /api/topics
export async function getTopics() {
  const response = await fetch(`${API_BASE_URL}/topics`, { method: 'GET' }); //  N.B GET is redundant as it's the default
  const data = await handleFetchResponse(response);
  return data.topics;
}

// GET All Articles > GET /api/topics
export async function getArticles(sort_by = 'created_at', order = 'desc') {
  const response = await fetch(`${API_BASE_URL}/articles?sort_by=${sort_by}&order=${order}`);
  const data = await handleFetchResponse(response);
  return data.articles;
}

// GET All Users > GET /api/users
export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  const data = await handleFetchResponse(response);
  return data.users;
}

//GET  single Article > GET /api/articles/:article_id
export async function getArticleById(article_id, username) {
  const response = await fetch(`${API_BASE_URL}/articles/${article_id}?username=${username}`);
  const data = await handleFetchResponse(response);
  return data.article;
}

// GET article's comments > GET /api/articles/:article_id/comments
export async function getCommentsByArticleId(articleid, username) {
  const response = await fetch(
    `${API_BASE_URL}/articles/${articleid}/comments?username=${username}`
  );
  const data = await handleFetchResponse(response);
  return data.comments;
}

// GET single user > GET /api/users/:username
export async function getUserByUsername(username) {
  const response = await fetch(`${API_BASE_URL}/users/${username}?username=${username}`);
  const data = await handleFetchResponse(response);
  return data.user;
}

// PATCH /api/articles/:article_id

export async function updateArticleVote(article_id, inc_votes, username) {
  const response = await fetch(`${API_BASE_URL}/articles/${article_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    // Sending heards is essential because the server needs to know what do with the string we are about to send,
    body: JSON.stringify({ inc_votes, username }),
  });
  const data = await handleFetchResponse(response);
  return data.article; // I return the article with the updated vote count
}

// PATCH /api/comments/:comment_id
export async function updateCommentVote(comment_id, inc_votes, username) {
  const response = await fetch(`${API_BASE_URL}/comments/${comment_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inc_votes, username }),
  });
  const data = await handleFetchResponse(response);
  return data.comment; // updated comment with votes
}

// POST /api/articles/:article_id/comments
export async function addCommentByArticleId(article_id, commentBody, commentUser) {
  const response = await fetch(`${API_BASE_URL}/articles/${article_id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Sending headers is essential because the server needs to know what do with the string we are about to send,
    body: JSON.stringify({ username: commentUser, body: commentBody }),
  });
  const data = await handleFetchResponse(response);
  return data.comment; // I return the posted comment
}

// DELETE /api/comments/:comment_id
export async function deleteCommentById(comment_id) {
  const response = await fetch(`${API_BASE_URL}/comments/${comment_id}`, {
    method: 'DELETE',
  });
  const data = await handleFetchResponse(response);
  return data; // if sucessful data will be null as per handleFetchResponse (204 status)
}

// helper function
async function handleFetchResponse(response) {
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(body?.msg || 'Something went wrong');
    error.status = response.status;
    error.data = body;
    throw error;
  }
  return body;
}
