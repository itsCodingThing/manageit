import { homedir } from "node:os";
import { randomInt } from "node:crypto";
import { existsSync, mkdirSync } from "node:fs";
import { resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { getUTCTimestamp } from "./date";

export { default as config } from "project/config/config.js";
export { default as firebaseConfig } from "project/config/firebase.js";

export const dirname = fileURLToPath(new URL(".", import.meta.url));
export const storagePath = {
	general: resolve(homedir(), "app-data"),
	image: resolve(homedir(), "app-data", "image"),
	pdf: resolve(homedir(), "app-data", "pdf"),
	audio: resolve(homedir(), "app-data", "audio"),
	doc: resolve(homedir(), "app-data", "doc"),
};

export function createAppDataFolders() {
	if (!existsSync(storagePath.general)) {
		mkdirSync(storagePath.general, { recursive: true });
	}

	if (!existsSync(storagePath.image)) {
		mkdirSync(storagePath.image, { recursive: true });
	}

	if (!existsSync(storagePath.pdf)) {
		mkdirSync(storagePath.pdf, { recursive: true });
	}

	if (!existsSync(storagePath.audio)) {
		mkdirSync(storagePath.audio, { recursive: true });
	}
}

export function customObjectGroupBy<L, K extends keyof L>(list: L[], key: K) {
	const map = new Map();
	const arr: Array<[(typeof list)[number][typeof key], L[]]> = [];

	for (const value of list) {
		if (map.has(value[key])) {
			map.set(value[key], [...map.get(value[key]), value]);
		} else {
			map.set(value[key], [value]);
		}
	}

	map.forEach((value, key) => {
		arr.push([key, value]);
	});

	return arr;
}

export function genFilePathName(params: {
	mime: string;
	ext: string;
}) {
	const { ext } = params;
	const name = `${getUTCTimestamp()}.${ext}`;

	return {
		filepath: resolve(storagePath.general, `${name}`),
		filename: name,
	};
}

export function genRandom4DigitInt() {
	return randomInt(1000, 10000);
}
