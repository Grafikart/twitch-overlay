import { RefreshingAuthProvider } from '@twurple/auth';
import { promises as fs, readFileSync, writeFileSync } from 'fs';
import 'dotenv/config'
import { PubSubClient, PubSubRedemptionMessage } from '@twurple/pubsub'
import { homedir } from 'os'
import { resolve } from 'path'

const REWARD_TITLE = 'On refait la déco'
const POWER_MODE = 'Power mode !'
const LIGHT = 'light'
const DARK = 'dark'
const COFFEE = 'café'
const BEIGE = 'beige'
const PURPLE = 'violet'
let powerMode = false

async function main () {
  // Authenticate to the API
  const clientId = process.env.TWITCH_ID;
  const clientSecret = process.env.TWITCH_SECRET;
  const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'utf-8'));
  const authProvider = new RefreshingAuthProvider(
    {
      clientId,
      clientSecret,
      onRefresh: async newTokenData => {
        await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'utf-8')
      }
    },
    tokenData
  );

  // Listen to reward usage
  const pubSubClient = new PubSubClient();
  const userId = await pubSubClient.registerUserListener(authProvider);
  await pubSubClient.onRedemption(userId, (message: PubSubRedemptionMessage) => {
    switch (message.rewardTitle) {
      case REWARD_TITLE:
        setTheme(message.message.toLowerCase())
        break;
      case POWER_MODE:
        togglePowerMode()
        break;
    }
  });
}

/**
 * Change the theme for VSCode
 */
function setTheme (theme: string): void {
  let themeName = 'Tokyo Night'
  switch (theme) {
    case LIGHT:
      themeName = 'Visual Studio Light'
      break;
    case BEIGE:
      themeName = 'Solarized Light'
      break;
    case PURPLE:
      themeName = 'Shades of Purple'
      break;
    case COFFEE:
      themeName = 'Bearded Theme Coffee'
      break;
  }
  updateVSCodeSetting("workbench.colorTheme", themeName)
}

/**
 * Enable the Power mode plugin that creates fireworks / combo when typing code
 */
function togglePowerMode (): void {
  if (powerMode) {
    return
  }
  powerMode = true
  updateVSCodeSetting('powermode.enabled', true)
  setTimeout(() => {
    updateVSCodeSetting('powermode.enabled', false)
    powerMode = false
  }, 60_000)
}

/**
 * Update one line in VSCode settting (on arch linux)
 */
function updateVSCodeSetting (settingName: string, value: string|boolean) {
  const settingPath = resolve(homedir(), '.config/Code/User/settings.json')
  const settings = readFileSync(settingPath)
    .toLocaleString()
    .replace(
      new RegExp(`"${settingName}": ([^,]+)`, 'g'),
      `"${settingName}": ${JSON.stringify(value)}`
    )
  writeFileSync(settingPath, settings)
}

main()
