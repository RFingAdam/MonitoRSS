import { array, InferType, number, object, string } from "yup";

export const DiscordMeUserSchema = object({
  id: string().required(),
  username: string().required(),
  iconUrl: string().optional(),
  supporter: object({
    guilds: array(string().required()).required(),
    maxFeeds: number().required(),
    maxGuilds: number().required(),
    expireAt: string().optional(),
  }).optional(),
  maxFeeds: number().required(),
  maxUserFeeds: number().required(),
  maxUserFeedsComposition: object({
    base: number().required(),
    legacy: number().required(),
  }),
  refreshRates: array(
    object({
      rateSeconds: number().required(),
      disabledCode: string().default(undefined),
    }).required()
  ).required(),
});

export type DiscordMeUser = InferType<typeof DiscordMeUserSchema>;
