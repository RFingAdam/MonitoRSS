import { array, boolean, InferType, number, object, string } from "yup";

export const discordMessageEmbedFieldFormSchema = object({
  name: string().max(256).required(),
  value: string().max(1024).required(),
  inline: boolean().default(false).required(),
  id: string().required(),
});

export const discordMessageEmbedFormSchema = object({
  color: string()
    .nullable()
    .test(
      "color",
      "Must be a valid color",
      (v) => !v || (!!v && /^\d+$/.test(v) && Number(v) < 16777216)
    )
    .optional(),
  author: object({
    name: string().nullable().max(256),
    url: string()
      .nullable()
      .when("name", ([name], schema) => {
        if (!name) {
          return schema.oneOf(["", null, undefined], "Must be empty if there is no author name");
        }

        return schema;
      })
      .nullable(),
    iconUrl: string()
      .nullable()
      .when("name", ([name], schema) => {
        if (!name) {
          return schema.oneOf(["", null, undefined], "Must be empty if there is no author name");
        }

        return schema;
      }),
  })
    .optional()
    .nullable(),
  title: string().max(256),
  url: string()
    .nullable()
    .when("title", ([title], schema) => {
      if (!title) {
        return schema.oneOf(["", null, undefined], "Must be empty if there is no title");
      }

      return schema;
    }),
  description: string().nullable().max(4096),
  thumbnail: object({
    url: string().nullable(),
  })
    .optional()
    .nullable(),
  image: object({
    url: string().nullable(),
  })
    .optional()
    .nullable(),
  footer: object({
    text: string().nullable().max(2048),
    iconUrl: string()
      .nullable()
      .when("text", ([text], schema) => {
        if (!text) {
          return schema.oneOf(["", null, undefined], "Must be empty if there is no footer text");
        }

        return schema;
      }),
  })
    .optional()
    .nullable(),
  timestamp: string().oneOf(["article", "now", "", undefined]).optional().nullable(),
  fields: array(discordMessageEmbedFieldFormSchema.required()).nullable(),
});

export const discordMessageFormSchema = object({
  content: string().max(2000),
  embeds: array().of(discordMessageEmbedFormSchema),
  forumThreadTitle: string().optional().max(100),
  forumThreadTags: array(
    object({
      id: string().required(),
      filters: object({
        expression: object().required(),
      })
        .nullable()
        .default(null),
    }).required()
  )
    .optional()
    .nullable()
    .default([]),
  mentions: object({
    targets: array(
      object({
        type: string().oneOf(["role", "user"]).required(),
        id: string().required(),
        filters: object({
          expression: object().required(),
        })
          .nullable()
          .default(null),
      }).required()
    ).nullable(),
  }).nullable(),
  customPlaceholders: array(
    object({
      id: string().required(),
      sourcePlaceholder: string().required(),
      regexSearch: string().required(),
      replacementString: string().nullable(),
    }).required()
  ).nullable(),
  placeholderLimits: array(
    object({
      characterCount: number().min(1).positive().integer().required(),
      placeholder: string().min(1).required(),
      appendString: string().optional().nullable(),
    }).required()
  )
    .nullable()
    .default(undefined),
  splitOptions: object({
    isEnabled: boolean().optional().nullable(),
    splitChar: string().max(10).optional().nullable(),
    appendChar: string().max(10).optional().nullable(),
    prependChar: string().max(10).optional().nullable(),
  })
    .optional()
    .nullable()
    .default(null),
  formatter: object({
    stripImages: boolean().default(false),
    formatTables: boolean().default(false),
    disableImageLinkPreviews: boolean().default(false),
  })
    .optional()
    .nullable(),
  enablePlaceholderFallback: boolean().optional(),
});

export type DiscordMessageFormData = InferType<typeof discordMessageFormSchema>;
export type DiscordMessageEmbedFormData = InferType<typeof discordMessageEmbedFormSchema>;
export type DiscordMessageEmbedFieldFormData = InferType<typeof discordMessageEmbedFieldFormSchema>;
