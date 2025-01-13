function getVideoContainer() {
  console.log("Finding video player...");
  return document.getElementById("movie_player")
}

function waitForVideoContainer(callback) {
  const videoContainer = getVideoContainer();
  if (videoContainer) {
    console.log("Video player found!");
    callback(videoContainer);
    return;
  }

  console.log("Waiting for video player to load...");
  const observer = new MutationObserver(() => {
    const videoContainer = getVideoContainer();
    if (videoContainer) {
      console.log("Video player loaded!");
      observer.disconnect(); // Stop observing once the player is found
      callback(videoContainer);
    }
  });

  // Observe the body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
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
    document.getElementById("new_player").focus();
  } else {
    console.error("No video ID found in URL.");
  }
}

/*
The code to be injected into the page context.

The reason of injecting this code to DOM instead of running it here,
is that here we don't have access to old player methods.
 */
const injectedCode = `
  console.log("[Injected Script] Waiting for the YouTube player to load...");
  function waitForPlayer(callback) {
    const player = document.getElementById('movie_player');
    if (player) {
      console.log("[Injected Script] Player found!");
      callback(player);
      return;
    }

    // Wait for the player to load using MutationObserver
    const observer = new MutationObserver(() => {
      const player = document.getElementById('movie_player');
      if (player) {
        console.log("[Injected Script] Player loaded!");
        observer.disconnect();
        callback(player);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  waitForPlayer((player) => {
    console.log("[Injected Script] Setting up the event listener...");
    player.pauseVideo();
    player.cancelPlayback();
    document.getElementById("new_player")?.focus(); // Focus iframe if present
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        console.log('[Injected Script] Spacebar pressed. Attempting to pause player...');
        player.pauseVideo();
      }
    });
  });
`;

window.addEventListener("yt-navigate-finish", () => {
  console.log("yt-navigation-finished event called!")
  if (window.location.href.includes("/watch")) {
    console.log("User is on a video watch page.");
    waitForVideoContainer((videoContainer) => {
      console.log("Proceeding to remove and replace the player...");
      removePlayer(videoContainer);
      replaceYouTubePlayer(videoContainer);
    });
  }

    // Inject the code into the page context
  const injected_script = document.getElementById('injected_script');
  if (injected_script) {
    injected_script.remove()
  }
  const script = document.createElement('script');
  script.id = 'injected_script';
  script.textContent = injectedCode; // Set the code as a text node
  (document.head || document.documentElement).appendChild(script);
});
