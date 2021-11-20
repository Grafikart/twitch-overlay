let channelName = null;
let provider = null;
const hideCommands = true;
const limit = 20
const chatBox = document.querySelector('#chatbox')
const colors = {
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
 * Supprime les éléments correspondant au selecteur du DOM
 *
 * @param {string} selector
 */
function removeFromDom(selector) {
  document.querySelectorAll(selector).forEach(el => el.remove());
}

window.addEventListener('onEventReceived', function (obj) {
  // Message de teste (util pour le debug)
  if (obj.detail.event.listener === 'widget-button') {
    if (obj.detail.event.field === 'testMessage') {
      let emulated = new CustomEvent("onEventReceived", {
        detail: {
          listener: "message", event: {
            service: "twitch",
            data: {
              time: Date.now(),
              tags: {
                "badge-info": "",
                badges: "moderator/1,partner/1",
                color: "#5B99FF",
                "display-name": "StreamElements",
                emotes: "25:46-50",
                flags: "",
                id: "43285909-412c-4eee-b80d-89f72ba53142",
                mod: "1",
                "room-id": "85827806",
                subscriber: "0",
                "tmi-sent-ts": "1579444549265",
                turbo: "0",
                "user-id": "100135110",
                "user-type": "mod"
              },
              nick: 'Grafikart',
              userId: "100135110",
              displayName: 'Grafikart',
              displayColor: "#5B99FF",
              badges: [{
                type: "moderator",
                version: "1",
                url: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
                description: "Moderator"
              }, {
                type: "partner",
                version: "1",
                url: "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",
                description: "Verified"
              }],
              channel: channelName,
              text: `Howdy My name is Bill and I am here to serve Kappa`,
              isAction: !1,
              emotes: [{
                type: "twitch",
                name: "Kappa",
                id: "25",
                gif: !1,
                urls: {
                  1: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                  2: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                  4: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0"
                },
                start: 46,
                end: 50
              }],
              msgId: "43285909-412c-4eee-b80d-89f72ba53142"
            },
            renderedText: `Howdy! My name is Bill and I am here to serve <img src="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 1x, https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/25/3.0 4x" title="Kappa" class="emote">`
          }
        }
      });
      window.dispatchEvent(emulated);
    }
    return;
  }
  // Quand on supprime un ou plusieurs messages
  if (obj.detail.listener === "delete-message") {
    return removeFromDom(`#msg-${obj.detail.event.msgId}`);
  } else if (obj.detail.listener === "delete-messages") {
    const sender = obj.detail.event.userId;
    return removeFromDom(`.message[data-sender=${sender}]`);
  }

  // Si on reçoit autre chose qu'un message, on quitte
  if (obj.detail.listener !== "message") {
    return;
  }
  let data = obj.detail.event.data;
  if (data.text.startsWith("!") && hideCommands) {
    return;
  }
  addMessage(data, obj.detail.event.renderedText)
});

window.addEventListener('onWidgetLoad', function (obj) {
  channelName = obj.detail.channel.username;
  fetch('https://api.streamelements.com/kappa/v2/channels/' + obj.detail.channel.id + '/')
    .then(response => response.json())
    .then((profile) => {
      provider = profile.provider;
    });
});

/**
 * Génère un message et l'ajoute au DOM
 * @param {ChatMessage} data
 * @param {string} html
 */
function addMessage (data, html) {
  const userColor = data.displayColor || `#${md5(data.displayName).substr(26)}`
  const badges = data.badges.reduce((acc, badge) =>  acc + `<img alt="" src="${badge.url}" class="badge">`,'')
  const className = cx(['message', getIntentionClass(data.text)])
  // const html = attachEmotes(data)
  const message= `<div data-sender="${data.userId}" id="msg-${data.msgId}" class="${className}">
    <div class="meta">
      <span class="badges">${badges}</span>
      <span class="name" style="--color: ${colors[userColor] || userColor}">${data.displayName}</span>
    </div>
    <div class="content">
      ${html}
    </div>
  </div>`
  chatBox.insertAdjacentHTML('beforeend', message)

  const messages = document.querySelectorAll('.message')
  const messageCount = messages.length
  if (messageCount > limit) {
    Array.from(messages).slice(0, messageCount - limit).forEach((el) => {
      el.remove()
    })
  }
}

function deleteLastMessages (count) {

}

/**
 * @param {string} text
 */
function getIntentionClass (text) {
  if (text.includes('!')) {
    return 'exclamation'
  }
  if (text.includes('?')) {
    return 'interrogation'
  }
}

/**
 * Génère une classe à partir d'un objet
 * @param {unknown} obj
 * @return {string}
 */
function cx (obj) {
  if (typeof obj === 'string') {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.filter(v => v).join(' ');
  }
  return '';
}

/**
 * Convertit un objet en style
 * @param {object} obj
 * @return {string}
 */
function style (obj) {
  return Object.keys(obj).map(key => `${key}: ${obj[key]}`).join(';')
}
