import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import {
  DiscordEmbed,
  DiscordConnectionFormatterOptions,
  DiscordSplitOptions,
  FiltersDto,
  MentionsOptionsDto,
  DiscordPlaceholderLimitOptions,
} from "../../../common";
import { FeedConnectionDisabledCode } from "../../feeds/constants";

class ForumThreadTagDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @IsOptional()
  @Type(() => FiltersDto)
  @ValidateNested({ each: true })
  filters?: FiltersDto;
}

export class UpdateDiscordChannelConnectionInputDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  channelId?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  forumThreadTitle?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ForumThreadTagDto)
  forumThreadTags?: ForumThreadTagDto[];

  @IsObject()
  @IsOptional()
  @Type(() => FiltersDto)
  @ValidateNested({ each: true })
  filters?: FiltersDto;

  @IsObject()
  @IsOptional()
  @Type(() => MentionsOptionsDto)
  @ValidateNested({ each: true })
  mentions?: MentionsOptionsDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DiscordPlaceholderLimitOptions)
  placeholderLimits?: DiscordPlaceholderLimitOptions[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiscordEmbed)
  @IsOptional()
  embeds?: DiscordEmbed[];

  @IsIn([FeedConnectionDisabledCode.Manual, null])
  @IsOptional()
  disabledCode?: FeedConnectionDisabledCode.Manual | null;

  @IsOptional()
  @Type(() => DiscordSplitOptions)
  @ValidateNested()
  @IsObject()
  @ValidateIf((v) => v !== null)
  splitOptions?: DiscordSplitOptions | null;

  @IsOptional()
  @Type(() => DiscordConnectionFormatterOptions)
  @ValidateNested()
  @IsObject()
  @ValidateIf((v) => v !== null)
  formatter?: DiscordConnectionFormatterOptions | null;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  enablePlaceholderFallback?: boolean;
}
