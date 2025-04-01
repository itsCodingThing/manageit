import { EventEmitter } from "eventemitter3";
import logger from "../utils/logger";

interface Events {
  REFRESH_BUNDLE_BY_PAPERID: (paperId: string) => void;
}

export const BackgroundEvent = new EventEmitter<Events>();

BackgroundEvent.on("REFRESH_BUNDLE_BY_PAPERID", async (paperId) => {
  logger.warn({ paperId }, "REFRESH_BUNDLE_BY_PAPERID");
});
