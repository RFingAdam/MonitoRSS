import { plainToClass, Type } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  validateSync,
} from "class-validator";

export enum Environment {
  Development = "development",
  Production = "production",
  Local = "local",
  Test = "test",
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  BACKEND_API_PORT: number;

  @IsString()
  @MinLength(1)
  BACKEND_API_DISCORD_BOT_TOKEN: string;

  @IsString()
  @MinLength(1)
  BACKEND_API_DISCORD_CLIENT_ID: string;

  @IsString()
  @MinLength(1)
  BACKEND_API_DISCORD_CLIENT_SECRET: string;

  @IsString()
  @MinLength(1)
  BACKEND_API_DISCORD_REDIRECT_URI: string;

  @IsString()
  @MinLength(1)
  BACKEND_API_LOGIN_REDIRECT_URI: string;

  @IsString()
  @MinLength(1)
  BACKEND_API_MONGODB_URI: string;

  @IsNumber()
  BACKEND_API_DEFAULT_REFRESH_RATE_MINUTES: number;

  @IsNumber()
  BACKEND_API_DEFAULT_MAX_FEEDS: number;

  @IsBoolean()
  BACKEND_API_SUBSCRIPTIONS_ENABLED: boolean;

  @IsString()
  @IsOptional()
  BACKEND_API_SUBSCRIPTIONS_HOST?: string;

  @IsString()
  @IsOptional()
  BACKEND_API_SUBSCRIPTIONS_ACCESS_TOKEN?: string;

  @IsString()
  BACKEND_API_SESSION_SECRET: string;

  @IsString()
  BACKEND_API_SESSION_SALT: string;

  @IsString()
  BACKEND_API_FEED_USER_AGENT: string;

  @IsString()
  @IsOptional()
  BACKEND_API_DATADOG_API_KEY?: string;

  @IsString()
  @IsOptional()
  BACKEND_API_AWS_ACCESS_KEY_ID?: string;

  @IsString()
  @IsOptional()
  BACKEND_API_AWS_SECRET_ACCESS_KEY?: string;

  @IsString()
  @IsOptional()
  BACKEND_API_DEFAULT_DATE_FORMAT?: string;

  @IsString()
  @IsOptional()
  BACKEND_API_DEFAULT_TIMEZONE?: string;

  @IsString()
  @IsOptional()
  BACKEND_API_DEFAULT_DATE_LANGUAGE?: string;

  @IsString()
  BACKEND_API_FEED_REQUESTS_API_KEY: string;

  @IsString()
  BACKEND_API_FEED_REQUESTS_API_HOST: string;

  @IsString()
  BACKEND_API_USER_FEEDS_API_HOST: string;

  @IsString()
  BACKEND_API_USER_FEEDS_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  BACKEND_API_RABBITMQ_BROKER_URL: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  BACKEND_API_DEFAULT_MAX_USER_FEEDS?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  BACKEND_API_DEFAULT_MAX_SUPPORTER_USER_FEEDS?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  BACKEND_API_MAX_DAILY_ARTICLES_SUPPORTER?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  BACKEND_API_MAX_DAILY_ARTICLES_DEFAULT?: number;
}

export function validateConfig(
  config: Record<string, unknown> | EnvironmentVariables
) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
