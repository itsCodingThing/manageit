import { createJsonResponse } from "./response";
import type { ObjValueAsType } from "./types";

export const ErrorNames = {
	validation: "ValidationError",
	api: "ApiError",
	service: "ServiceError",
	internal: "InternalServerError",
} as const;
export type ErrorName = ObjValueAsType<typeof ErrorNames>;

interface BaseErrorParams<Data> {
	name: ErrorName;
	code: number;
	msg: string;
	data?: Data;
}

export type ResponseErrorMsg = `${ErrorName}: ${string}`;

export class BaseError<Data> extends Error {
	code: number;
	msg: string;
	status: number;
	data: Data;
	name: ErrorName;

	constructor(errorParams: BaseErrorParams<Data>) {
		super(errorParams.msg);
		this.status = errorParams.code;
		this.msg = errorParams.msg;
		this.name = errorParams.name;
		this.code = errorParams.code;
		this.data = errorParams.data ?? ({} as Data);

		Error.captureStackTrace(this);
	}

	toResponse() {
		return createJsonResponse({
			msg: this.message,
			data: this.data,
		});
	}
}

export class ValidationError<Data> extends BaseError<Data> {
	constructor(
		params: Partial<Pick<BaseErrorParams<Data>, "msg" | "data" | "code">>,
	) {
		super({
			name: ErrorNames.validation,
			code: params.code ?? 400,
			msg: params.msg ?? "",
			data: params.data,
		});
	}
}

export class ApiError<Data> extends BaseError<Data> {
	constructor(
		params: Partial<Pick<BaseErrorParams<Data>, "msg" | "data" | "code">>,
	) {
		super({
			name: ErrorNames.api,
			msg: params.msg ?? "",
			data: params.data,
			code: params.code ?? 500,
		});
	}
}

export class ServiceError<Data> extends BaseError<Data> {
	constructor(params: Partial<Pick<BaseErrorParams<Data>, "msg" | "data">>) {
		super({
			name: ErrorNames.service,
			msg: params.msg ?? "",
			data: params.data,
			code: 500,
		});
	}
}
