export type {
  DiscordAllowList,
  DiscordChannelConfigResolved,
  DiscordGuildEntryResolved,
} from "./monitor/allow-list.js";
export {
  allowListMatches,
  isDiscordGroupAllowedByPolicy,
  normalizeDiscordAllowList,
  normalizeDiscordSlug,
  resolveDiscordChannelConfig,
  resolveDiscordChannelConfigWithFallback,
  resolveDiscordCommandAuthorized,
  resolveDiscordGuildEntry,
  resolveDiscordShouldRequireMention,
  resolveGroupDmAllow,
  shouldEmitDiscordReactionNotification,
} from "./monitor/allow-list.js";
export type { DiscordMessageEvent, DiscordMessageHandler } from "./monitor/listeners.js";
export { registerDiscordListener } from "./monitor/listeners.js";

export { createDiscordMessageHandler } from "./monitor/message-handler.js";
export { buildDiscordMediaPayload } from "./monitor/message-utils.js";
export { createDiscordNativeCommand } from "./monitor/native-command.js";
export type { MonitorDiscordOpts } from "./monitor/provider.js";
export async function monitorDiscordProvider(
  ...args: Parameters<typeof import("./monitor/provider.js").monitorDiscordProvider>
): ReturnType<typeof import("./monitor/provider.js").monitorDiscordProvider> {
  const { monitorDiscordProvider: monitor } = await import("./monitor/provider.js");
  return monitor(...args);
}

export { resolveDiscordReplyTarget, sanitizeDiscordThreadName } from "./monitor/threading.js";
