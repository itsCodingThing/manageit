import { APIError as BetterAuthAPIError } from "better-auth";
import { BaseError, ErrorNames } from "./error";

interface ResponseParams {
  code?: number;
  msg?: string;
  data?: any;
}

export function createResponse(params: ResponseParams) {
  const { code = 200, msg = "success", data = {} } = params;
  return { statusCode: code, message: msg, data: data };
}

export function createErrorResponse(error?: Error) {
  if (error instanceof BaseError) {
    return createResponse({
      code: error.code,
      msg: `${error.name}: ${error.msg}`.trim(),
      data: error.data,
    });
  }

  if (error instanceof BetterAuthAPIError) {
    return createResponse({
      code: 500,
      msg: error.message,
    });
  }

  console.log(error);
  return createResponse({ msg: ErrorNames.internal, code: 500 });
}
