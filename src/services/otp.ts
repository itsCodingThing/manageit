import { setTimeout } from "timers/promises";
import { ServiceError } from "../utils/error";
import { genRandom4DigitInt } from "../utils/utils";
import logger from "project/utils/logger";

export async function gen4DigitOTP() {
  return genRandom4DigitInt().toString();
}

export async function sendOTP(mobile: string) {
  const otp = await gen4DigitOTP();

  try {
    await setTimeout(1000 * 10);
    logger.warn({ mobile, otp }, "Please there will be 10 secs delay due this sendOTP method")
    return otp;
  } catch {
    throw new ServiceError({ msg: "Unable send otp" });
  }
}
