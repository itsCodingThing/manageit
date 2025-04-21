import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { sendJsonResponse } from "./server-response";
import type { ObjValueAsType } from "./types";

const ErrorNames = {
	validation: "ValidationError",
	api: "ApiError",
	service: "ServiceError",
	internal: "InternalServerError",
} as const;
export type ErrorName = ObjValueAsType<typeof ErrorNames>;

interface BaseErrorParams {
	name: ErrorName;
	code?: number;
	status?: boolean;
	msg?: string;
	data?: unknown;
}

type ErrorParams = Partial<Pick<BaseErrorParams, "msg" | "data" | "code">>;

export type ResponseErrorMsg = `${ErrorName}: ${string}`;

export class BaseError extends Error {
	code: number;
	msg: string;
	status: boolean;
	data: unknown;
	name: ErrorName;

	constructor(errorParams: BaseErrorParams) {
		super(errorParams.msg);
		this.status = errorParams.status ?? false;
		this.msg = errorParams.msg ?? "";
		this.name = errorParams.name;
		this.code = errorParams.code ?? 500;
		this.data = errorParams.data;

		Error.captureStackTrace(this);
	}
}

export class ValidationError extends BaseError {
	constructor(params: ErrorParams) {
		const { msg = "", data, code } = params;
		super({ name: ErrorNames.validation, code: code ?? 400, msg, data });
	}
}

export class ApiError extends BaseError {
	constructor(params: ErrorParams) {
		const { msg = "", data, code } = params;
		super({ name: ErrorNames.api, code: code ?? 500, msg, data });
	}
}

export class ServiceError extends BaseError {
	constructor(params: ErrorParams) {
		const { msg = "", data, code } = params;
		super({ name: ErrorNames.service, code: code ?? 500, msg, data });
	}
}

export async function errorHandler(
	error: FastifyError,
	_req: FastifyRequest,
	res: FastifyReply,
) {
	if (error instanceof BaseError) {
		return sendJsonResponse(res, {
			code: error.code,
			msg: `${error.name}: ${error.msg}`.trim(),
			data: error.data,
		});
	}

	return sendJsonResponse(res, {
		code: 500,
		msg: ErrorNames.internal,
		data: error.toString(),
	});
}
