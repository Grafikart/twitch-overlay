import "./style.css";

// On extrait les phrase depuis les paramètres de l'URL
const url = new URL(window.location.href);
const injectableParams = ["os", "ide", "baseline", "title"];
injectableParams.forEach((paramName) => {
  const paramValue = url.searchParams.get(paramName);
  if (paramValue) {
    document.getElementById(paramName).innerHTML = microMarkdown(paramValue);
  }
});

/**
 * Implémentation naïve du markdown
 *
 * @param {string} str
 * @returns {string}
 */
function microMarkdown(str) {
  return str.replace(/\*\*([^*]*)\*\*?/g, "<strong>$1</strong>");
}

window.onYouTubePlayerAPIReady = () => {
  new YT.Player("ytplayer", {
    width: "100%",
    height: "100%",
    videoId: url.searchParams.get("yt") || "Jox6R5-rIH0",
    host: "https://www.youtube-nocookie.com",
    playerVars: {
      origin: window.location.host,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

/**
 * @param {YT.PlayerEvent} event
 */
function onPlayerReady(event) {
  event.target.playVideo();
  event.target.setPlaybackRate(0.7);
  event.target.mute();
}

/**
 * @param {YT.OnStateChangeEvent} event
 */
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    event.target.seekTo(0, true);
    event.target.playVideo();
  }
}
