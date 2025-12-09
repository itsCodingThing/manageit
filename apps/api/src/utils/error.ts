import type { ObjValueAsType } from "./types";

export const ErrorNames = {
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
	data?: any;
}

export type ResponseErrorMsg = `${ErrorName}: ${string}`;

export class BaseError extends Error {
	code: number;
	msg: string;
	status: boolean;
	data: any;
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
	constructor(params: Partial<Pick<BaseErrorParams, "msg" | "data" | "code">>) {
		const defaultApiErrorParams = { msg: "", data: [], code: 400 };

		if (!params) {
			params = defaultApiErrorParams;
		}

		const {
			msg = defaultApiErrorParams.msg,
			data = defaultApiErrorParams.data,
			code = defaultApiErrorParams.code,
		} = params;
		super({ name: ErrorNames.validation, code, msg, data });
	}
}

export class ApiError extends BaseError {
	constructor(
		params?: Partial<Pick<BaseErrorParams, "msg" | "data" | "code">>,
	) {
		const defaultApiErrorParams = { msg: "", data: [], code: 500 };

		if (!params) {
			params = defaultApiErrorParams;
		}

		const {
			msg = defaultApiErrorParams.msg,
			data = defaultApiErrorParams.data,
			code = defaultApiErrorParams.code,
		} = params;

		super({ name: ErrorNames.api, msg, data, code });
	}
}

export class ServiceError extends BaseError {
	constructor(
		{ msg = "", data }: Partial<Pick<BaseErrorParams, "msg" | "data">> = {
			msg: "",
			data: [],
		},
	) {
		super({ name: ErrorNames.service, msg, data });
	}
}
