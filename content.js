chrome.storage.local.get(['enabled'], (result) => {
  const extensionEnabled = result.enabled !== false;

  if (extensionEnabled) {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");

      if (link && link.href.includes("youtube.com/watch")) {
        const url = new URL(link.href);
        const videoId = url.searchParams.get("v");

        if (videoId) {
          event.preventDefault();
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          window.open(embedUrl, "_blank");
        }
      }
    });
  }
});
