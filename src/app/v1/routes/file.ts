import { createReadStream, createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import type { FastifyPluginAsync } from "fastify";
import { fileTypeFromFile } from "file-type";

import {
	sendErrorResponse,
	sendJsonResponse,
} from "project/utils/server-response";
import { storagePath } from "project/utils/utils";
import { parseAsync, zod } from "project/utils/validation";
import { getUTCTimestamp } from "project/utils/date";

export const fileStorageRoutes: FastifyPluginAsync = async (fastify) => {
	/**
	 * @rotue   POST "/api/v1/file/upload"
	 * @desc    Upload file
	 */
	fastify.route({
		method: "POST",
		url: "/file/upload",
		handler: async (req, res) => {
			const bytes = 1000000 * 200; // mb;
			const data = await req.file({ limits: { fileSize: bytes } });

			if (!data) {
				return sendErrorResponse({
					response: res,
					msg: "unable to upload file",
				});
			}

			const filename = `${getUTCTimestamp()}-${data.filename.replaceAll(" ", "")}`;
			const filepath = resolve(storagePath.general, filename);

			await pipeline(data.file, createWriteStream(filepath));

			return sendJsonResponse(res, { data: filename });
		},
	});

	/**
	 * @rotue   GET "/api/v1/file/:filename"
	 * @desc    Get file
	 */
	fastify.route({
		method: "GET",
		url: "/file/:filename",
		handler: async (req, res) => {
			const { filename } = await parseAsync(
				zod.object({ filename: zod.string() }),
				req.params,
			);

			const filepath = resolve(storagePath.general, filename);

			let mime: string;
			try {
				const type = await fileTypeFromFile(filepath);

				if (!type) {
					return sendJsonResponse(res, { msg: "unable to find file" });
				}

				mime = type.mime;
			} catch {
				return sendJsonResponse(res, { msg: "unable to find file" });
			}

			res.type(mime ?? "application/octet-stream");
			return res.send(createReadStream(filepath));
		},
	});
};
