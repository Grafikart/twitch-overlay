const tchat = document.querySelector("#log");
const messageTemplate = document.querySelector("#chatlist_item").innerHTML;
const colors = [
  "#FF0000",
  "#0000FF",
  "#008000",
  "#B22222",
  "#FF7F50",
  "#9ACD32",
  "#FF4500",
  "#2E8B57",
  "#DAA520",
  "#D2691E",
  "#5F9EA0",
  "#1E90FF",
  "#FF69B4",
  "#8A2BE2",
  "#00FF7F",
];

let n = 0;

function random(max, min = 0) {
  return Math.round(Math.random() * (max - min)) + min;
}

function randomMessage() {
  const seed =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar, orci sit amet fringilla ultrices, dolor tortor imperdiet nisi, eu pulvinar orci est viverra urna. Fusce tincidunt, enim non semper auctor, metus risus porta justo, et maximus nibh purus id purus. Sed mattis finibus elit, vel lacinia quam accumsan pretium. Praesent pulvinar non erat ut efficitur. Donec at vehicula justo. Integer ultrices luctus tellus, eget fermentum ex. Aliquam sollicitudin diam non mauris luctus pulvinar. Curabitur velit nisl, sodales vel faucibus quis, elementum nec erat. Aenean ut metus sed sapien vehicula euismod. Sed blandit sagittis tortor, quis posuere turpis porttitor a. Phasellus magna diam, sodales id ante ut, mollis mollis nisi.";
  const length = random(6, 100);
  const start = random(seed.length - length);
  const emote =
    Math.random() > 0.1
      ? ' <span class="emote" style="background-image: url(https://static-cdn.jtvnw.net/emoticons/v1/301761506/1.0);"><img src="https://static-cdn.jtvnw.net/emoticons/v1/301761506/1.0"></span>'
      : "";
  return seed.substr(start, length) + emote;
}

function randomUsername() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const length = random(20, 3);
  return Array(length)
    .fill(1)
    .map(() => letters.charAt(random(letters.length - 1)))
    .join("");
}

function strToDom(str) {
  return document.createRange().createContextualFragment(str);
}

function addMessage() {
  const message = strToDom(
    messageTemplate
      .replaceAll("{from}", randomUsername())
      .replaceAll("{color}", colors[random(colors.length)])
      .replaceAll("{message}", randomMessage())
  );
  if (Math.random() > 0.8) {
    message.querySelector(
      ".badges"
    ).innerHTML = `<img src="https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/1"
                        class="badge subscriber-icon"><img
                        src="https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/1"
                        class="badge premium-icon">`;
  }
  tchat.appendChild(message);
}

for (let i = 0; i < 100; i++) {
  addMessage();
}

document.addEventListener("click", function () {
  addMessage();
});
