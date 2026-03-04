## Development Status

**Set up**

- [x] Set up folders structure
- [x] Create page and layout component stubs
- [x] Set up UserContext with default user
- [x] Configure router and main routes
- [x] Wire PageLayout with navbar, outlet, footer

**Home Page**

- [x] Home page fetches articles with loading and error
- [x] Sort Controls: Add the sorting dropdown/buttons to the HomePage. Update local state when changed, and ensure your useEffect re-runs to fetch the newly sorted articles.
- [x] Create custom util to translate sort labels to param queries
- [x] Use custom hook for loading and error
- [x] Build ArticleCard and list on Home
- [x] Article page fetches article and comments with states
- [x] Create custom fetch hook.

**Article page**

- [x] Create custom use share for share button.
- [x] Render Article Header
- [x] Render Article Body
- [x] Create custom hook use vote for implementing voting flow.
- [x] Optimistic Voting on articles: Create the VoteButtons component. When clicked, immediately update the local vote count state by +1 or -1. Call updateVoteCount(). If the API fails, revert the state and show an error.
- [x] Finish comment footer
- [x] Render comments []
- [ ] Add link to userpage (both in article and comments)
- [ ] Comment header add condition Original Poster badge
- [ ] Comment Deletion: In CommentCard, check if the comment's author matches your UserContext username. If yes, show a Delete button. On click, call deleteCommentById(). If successful, filter that comment out of the parent component's state.
- [ ] Comment Posting: Build the CommentComposer with a text area. On submit, call addCommentByArticleId() using the text and your Context username. On success, take the returned comment object and add it to the top of your comments state array. Clear the text area.

**Topic page**

- [ ] Add topic links to home page
- [ ] Topic Page
- [ ] Re use sort controls

**User page**

- [ ] User Page:

**Other UI**

- [ ] Nav Bar
- [ ] Fetch Topics: In the Navbar (or App), call getTopics() on mount. Map these topics inside your drawer so users can click them to navigate.

**Other**

- [ ] Remove double loading spinner on article page
- [ ] Error & Loading Audit: Go through every single page. Manually trigger an error (e.g., change a URL parameter to something invalid) and ensure your UI shows a friendly "Not Found" or "Something went wrong" message instead of a blank screen. Ensure loading states display properly.

- [x] CSS / Styling: Open index.css and start applying your PressIt color palette, flexbox layouts, and typography.
- [ ] Deploly live demo
- [ ] refactor util function for dates fn

**Nice to have**

- [ ] Find a way to avoid optimistic rendering of votes when user tries to vote a second time

**Stretch**
