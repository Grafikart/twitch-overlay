declare const md5: (string) => string;

export interface ChatMessage {
  time: number;
  tags: Tags;
  nick?: null;
  userId: string;
  displayName?: null;
  displayColor: string;
  badges?: (BadgesEntity)[] | null;
  channel?: null;
  text: string;
  isAction: boolean;
  emotes?: (EmotesEntity)[] | null;
  msgId: string;
}
export interface Tags {
  'badge-info': string;
  badges: string;
  color: string;
  'display-name': string;
  emotes: string;
  flags: string;
  id: string;
  mod: string;
  'room-id': string;
  subscriber: string;
  'tmi-sent-ts': string;
  turbo: string;
  'user-id': string;
  'user-type': string;
}
export interface BadgesEntity {
  type: string;
  version: string;
  url: string;
  description: string;
}
export interface EmotesEntity {
  type: string;
  name: string;
  id: string;
  gif: boolean;
  urls: Urls;
  start: number;
  end: number;
  coords: Coords;
}
export interface Urls {
  1: string;
  2: string;
  4: string;
}
export interface Coords {
  x: number;
  y: number;
}
