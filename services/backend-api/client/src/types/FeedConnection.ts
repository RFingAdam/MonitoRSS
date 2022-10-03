import {
  array, InferType, object, string,
} from 'yup';
import { FeedEmbedSchema } from './FeedEmbed';

export enum FeedConnectionType {
  DiscordChannel = 'DISCORD_CHANNEL',
  DiscordWebhook = 'DISCORD_WEBHOOK',
}

const DiscordChannelConnectionDetailsSchema = object({
  embeds: array(FeedEmbedSchema).required(),
  channel: object({
    id: string().required(),
  }).required(),
  content: string().optional(),
});

const DiscordWebhookConnectionDetailsSchema = object({
  embeds: array(FeedEmbedSchema).required(),
  webhook: object({
    id: string().required(),
    name: string().optional(),
    iconUrl: string().optional(),
  }).required(),
  content: string().optional(),
});

export const FeedConnectionSchema = object({
  id: string().required(),
  name: string().required(),
  key: string().oneOf(Object.values(FeedConnectionType)).required(),
  filters: object({
    expression: object(),
  }).optional().default(undefined).nullable(),
  details: object().when('key', ([key]) => {
    if (key === FeedConnectionType.DiscordWebhook) {
      return DiscordWebhookConnectionDetailsSchema;
    }

    return DiscordChannelConnectionDetailsSchema;
  }),
});

export type FeedConnection = InferType<typeof FeedConnectionSchema>;
