function getVideoContainer() {
  console.log("Finding video player...");
  return document.getElementById("movie_player")
}

function removePlayer(videoContainer) {
  console.log("Removing the player...");
  videoContainer.innerHTML = "";
}

function replaceYouTubePlayer(videoContainer) {
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

    videoContainer.appendChild(iframe);
  } else {
    console.error("No video ID found in URL.");
  }
}

window.addEventListener("yt-navigate-finish", () => {
  console.log("yt-navigation-finished event called!")
  if (window.location.href.includes("/watch")) {
    const videoContainer = getVideoContainer();
    removePlayer(videoContainer);
    replaceYouTubePlayer(videoContainer);
  }
});
