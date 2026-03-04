import { useState } from 'react';
import { updateArticleVote, updateCommentVote } from '../api';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';

export function useVote({ initialVotes, initialUserVote = 0, type, id }) {
  const { user } = useUser();
  const [displayVotes, setDisplayVotes] = useState(initialVotes);
  const [currentVote, setCurrentVote] = useState(initialUserVote); // -1, 0, 1
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentVote(initialUserVote);
  }, [initialUserVote]);

  useEffect(() => {
    setDisplayVotes(initialVotes);
  }, [initialVotes]);

  const apiFn = type === 'article' ? updateArticleVote : updateCommentVote;

  async function handleVote(direction) {
    if (!user) {
      setError(new Error('You must be logged in to vote'));
      return;
    }

    const username = user.username;
    const prevVote = currentVote;
    const prevVotes = displayVotes;

    let newVote;
    if (prevVote === direction) {
      newVote = 0; // unvote
    } else {
      newVote = direction; // set to +1 or -1
    }
    const delta = newVote - prevVote;

    // optimistic rendering
    setCurrentVote(newVote);
    setDisplayVotes(prevVotes + delta);
    setError(null);

    try {
      await apiFn(id, direction, username);
    } catch (err) {
      // rollback
      setCurrentVote(prevVote);
      setDisplayVotes(prevVotes);
      setError(err);
    }
  }

  const upvote = () => handleVote(1);
  const downvote = () => handleVote(-1);

  return { displayVotes, currentVote, upvote, downvote, error };
}
