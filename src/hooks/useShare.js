export function useShare() {
  async function handleShare(title, url) {
    const shareData = {
      title,
      text: `Check out this article: ${title}`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Share cancelled or failed.', err);
    }
  }

  return { handleShare };
}
