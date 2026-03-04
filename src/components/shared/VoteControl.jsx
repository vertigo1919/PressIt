import { useVote } from '../../hooks/useVote';

export function VoteControl({ id, votes, userVote = 0, type }) {
  //NB currentVote records the vote action of the current session
  // 1 means the article has been upvoted
  // 0 means no action
  // -1 means the article has been downvoted

  const { displayVotes, currentVote, upvote, downvote } = useVote({
    initialVotes: votes,
    initialUserVote: userVote,
    type: type,
    id: id,
  });

  //build class names for upvote and downvote buttons
  const upVoteClassName = `vote-control-upvote-btn${
    currentVote === 1 ? ' vote-control-upvote-btn--voted' : ''
  }`;

  const downVoteClassName = `vote-control-downvote-btn${
    currentVote === -1 ? ' vote-control-downvote-btn--voted' : ''
  }`;

  return (
    <div className="vote-control">
      <button className={upVoteClassName} onClick={upvote}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10z" />
        </svg>
      </button>

      <span className="vote-control__count">{displayVotes}</span>

      <button className={downVoteClassName} onClick={downvote}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z" />
        </svg>
      </button>
    </div>
  );
}
