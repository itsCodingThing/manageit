interface Response {
  code?: number;
  msg?: string;
  data?: any;
}

export function createResponse(params: Response) {
  const { code = 200, msg = "success", data = {} } = params;
  return { statusCode: code, message: msg, data: data };
}
