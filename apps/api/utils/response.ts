export function createJsonResponse<Data>(params: {
	msg?: string;
	data: Data;
}): {
	message: string;
	data: Data;
};

export function createJsonResponse(params?: { msg?: string }): {
	message: string;
	data: Record<string, never>;
};

export function createJsonResponse<Data>(params?: {
	msg?: string;
	data?: Data;
}) {
	const { msg = "success", data = {} as Record<string, never> } = params || {};
	return { message: msg, data: data as Data | Record<string, never> };
}
