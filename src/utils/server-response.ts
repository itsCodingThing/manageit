import type { FastifyReply } from "fastify";

interface IResponse {
	code?: number;
	msg?: string;
	data?: unknown;
	status?: boolean;
}

export function sendJsonResponse(response: FastifyReply, params: IResponse) {
	let { msg = "success", data = {}, status = true, code = 200 } = params;

	if (code !== 200) {
		status = false;
	}

	return response.code(code).send({ message: msg, data: data, status });
}

interface ISendResponse extends IResponse {
	response: FastifyReply;
}

export function createResponse(params: IResponse) {
	const { msg = "success", data = {}, status = true, code = 200 } = params;
	if (Array.isArray(data)) {
		return {
			message: msg,
			data: data,
			status,
			count: data.length,
		};
	}

	return { message: msg, data: data, status };
}

export function sendResponse(params: ISendResponse): FastifyReply {
	const { msg, data = {}, response, status } = params;

	if (response.sent) {
		return response;
	}

	return response.send(createResponse({ msg, data, status }));
}

export function sendSuccessResponse(params: ISendResponse) {
	const { msg = "success", data = {}, response } = params;
	return sendResponse({ response, msg, data, status: true });
}

export function sendErrorResponse(params: ISendResponse) {
	const { msg = "error", data = {}, response } = params;
	return sendResponse({ response, msg, data, status: false });
}
