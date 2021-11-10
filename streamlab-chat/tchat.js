let currentColor = 0;
const twitchColors = {
  "#0000ff": "blue",
  "#ff0000": "red",
  "#8a2be2": "purple",
  "#ff69b4": "pink",
  "#1e90ff": "lightblue",
  "#008000": "green",
  "#00ff7f": "lightgreen",
  "#b22222": "darkred",
  "#daa520": "gold",
  "#ff4500": "darkorange",
  "#2e8b57": "gazon",
  "#5f9ea0": "teal",
  "#d2691e": "brown",
  "#9acd32": "fluogreen",
  "#ff7f50": "orange",
  "#000000": "black",
  "#ffffff": "white",
  "#cc0000": "blood",
  "#666666": "grey",
  "#ffff00": "yellow",
  "#00ffff": "cyan",
  "#8A2BE2": "purple",
};

/**
 * Renvoie la couleur associé au pseudo
 * @param {string} username
 */
function colorForUsername(username) {
  if (!nameColors.has(username)) {
    nameColors.set(username, colors[currentColor++]);
  }
  return nameColors.get(username);
}

/**
 * @param {HTMLDivElement} node
 */
function colorizeUsername(node) {
  const $username = node.querySelector(".name");
  const originalColor = $username.dataset.color;
  const cssValue = twitchColors[originalColor]
    ? `var(--${twitchColors[originalColor]})`
    : originalColor;
  $username.style.setProperty("--color", cssValue);
}

/**
 * @param {HTMLDivElement} node
 */
function processSentiment(node) {
  const $message = node.querySelector('.content').textContent
  if ($message.includes('!')) {
    node.classList.add('exclamation')
  } else if ($message.includes('?')) {
    node.classList.add('interrogation')
  }
}

/**
 * @param {MutationRecord[]} mutationsList
 */
function handleMutation(mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (let node of mutation.addedNodes) {
        if (node.tagName === "DIV") {
          colorizeUsername(node);
          processSentiment(node);
        }
      }
    }
  }
}

const observer = new MutationObserver(handleMutation);
observer.observe(document.querySelector("#log"), {
  childList: true,
});
