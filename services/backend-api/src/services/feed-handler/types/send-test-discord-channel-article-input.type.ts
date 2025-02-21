import { DiscordMediumEvent } from "../../../common";
import { FeedConnectionDiscordChannelType } from "../../../features/feeds/constants";
import { DiscordChannelConnection } from "../../../features/feeds/entities/feed-connections";

export interface SendTestDiscordChannelArticleInput {
  details: {
    type: "discord";
    feed: {
      url: string;
      formatOptions: {
        dateFormat?: string | undefined;
        dateTimezone?: string | undefined;
      };
    };
    article?: {
      id: string;
    };
    mediumDetails: {
      channel: {
        id: string;
        type?: FeedConnectionDiscordChannelType | null;
      };
      content?: string;
      embeds: DiscordMediumEvent["details"]["embeds"];
      formatter?: {
        stripImages?: boolean;
        formatTables?: boolean;
      };
      splitOptions?: {
        splitChar?: string | null;
        appendChar?: string | null;
        prependChar?: string | null;
      };
      forumThreadTitle?: DiscordChannelConnection["details"]["forumThreadTitle"];
      forumThreadTags?: DiscordChannelConnection["details"]["forumThreadTags"];
      mentions?: DiscordChannelConnection["mentions"];
      placeholderLimits?: DiscordChannelConnection["details"]["placeholderLimits"];
      enablePlaceholderFallback?: DiscordChannelConnection["details"]["enablePlaceholderFallback"];
      customPlaceholders: DiscordChannelConnection["customPlaceholders"];
    };
  };
}
