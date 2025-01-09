const videoContainerXPath = '//div[@id="movie_player"]';

function replaceYouTubePlayer() {
  // Locate the video container using XPath
  console.log("Finding video player...");
  const videoContainer = document.evaluate(
    videoContainerXPath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (videoContainer) {
    console.log("Video player found. Replacing with iframe...");

    // Get the video ID from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("v");

    if (videoId) {
      // Create an iframe for the embedded player
      const iframe = document.createElement("iframe");
      iframe.id = "new_player";
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "none";
      iframe.title = "YouTube video player";
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      );
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.setAttribute("allowfullscreen", "");

      // Clear the existing container and add iframe to it
      videoContainer.innerHTML = "";
      videoContainer.appendChild(iframe);
    } else {
      console.error("No video ID found in URL.");
    }
  } else {
    console.error("Video container not found.");
  }
}

replaceYouTubePlayer();
