import { array, boolean, InferType, number, object, string } from "yup";
import fetchRest from "../../../utils/fetchRest";
import { GetArticlesFilterReturnType } from "../constants";
import { UserFeedArticleRequestStatus } from "../types";

export interface GetUserFeedArticlesInput {
  feedId: string;
  data: {
    skip: number;
    limit: number;
    random?: boolean;
    selectProperties?: string[];
    filters?: {
      expression?: Record<string, any>;
      returnType?: GetArticlesFilterReturnType;
      articleId?: string;
      search?: string;
    };
    formatter: {
      customPlaceholders?: Array<{
        id: string;
        sourcePlaceholder: string;
        regexSearch: string;
        replacementString?: string | null;
      }> | null;
      options: {
        formatTables: boolean;
        stripImages: boolean;
        dateFormat: string | undefined;
        dateTimezone: string | undefined;
        disableImageLinkPreviews?: boolean;
      };
    };
  };
}

const GetUserFeedArticlesOutputSchema = object({
  result: object()
    .shape({
      requestStatus: string().oneOf(Object.values(UserFeedArticleRequestStatus)).required(),
      response: object({
        statusCode: number(),
      }),
      articles: array(
        object({
          id: string().required(),
        })
      ).required(),
      totalArticles: number().required(),
      selectedProperties: array(string().required()).required(),
      filterStatuses: array(
        object({
          passed: boolean().required(),
        }).required()
      )
        .optional()
        .default([]),
    })
    .required(),
}).required();

export type GetUserFeedArticlesOutput = InferType<typeof GetUserFeedArticlesOutputSchema>;

export const getUserFeedArticles = async (
  options: GetUserFeedArticlesInput
): Promise<GetUserFeedArticlesOutput> => {
  const res = await fetchRest(`/api/v1/user-feeds/${options.feedId}/get-articles`, {
    requestOptions: {
      method: "POST",
      body: JSON.stringify(options.data),
    },
    validateSchema: GetUserFeedArticlesOutputSchema,
  });

  return res as GetUserFeedArticlesOutput;
};
