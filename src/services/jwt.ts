import jsonwebtoken, { type JwtPayload } from "jsonwebtoken";
import { ServiceError } from "project/utils/error";
import { config, uuidv4 } from "project/utils/utils";
import { redisClient } from "./redis";

const { jwt } = config;

interface IPayload {
  id: string;
  type: string;
}

export type JwtVerifyPayload = IPayload & JwtPayload;

export function generateJWT(payload: IPayload) {
  const token = jsonwebtoken.sign(payload, jwt.publicKey, {
    expiresIn: "30d",
  });
  return token;
}

export function verifyJWT(token: string) {
  const payload = jsonwebtoken.verify(token, jwt.publicKey);
  return payload as JwtVerifyPayload;
}

interface OpaqueTokenParams {
  userId: string;
  userType: string;
}

export async function getToken(opaqueToken: string) {
  return await redisClient.get(`access:${opaqueToken}`);
}

export async function createToken(payload: OpaqueTokenParams) {
  const opaqueToken = uuidv4();
  const token = generateJWT({ id: payload.userId, type: payload.userType });
  const refreshToken = generateJWT({
    id: payload.userId,
    type: payload.userType,
  });

  await redisClient.set(`access:${opaqueToken}`, token, { EX: 900 }); // 15 min
  await redisClient.set(`refresh:${refreshToken}`, opaqueToken, {
    EX: 2592000,
  }); // 30 days

  return {
    opaqueToken,
    refreshToken,
  };
}

export async function removeOldTokens(refreshToken: string) {
  const oldOpaqueToken = await redisClient.get(`refresh:${refreshToken}`);
  if (!oldOpaqueToken) {
    throw new ServiceError({ msg: "invalid refresh token" });
  }

  // Invalidate old tokens
  await redisClient.del(`access:${oldOpaqueToken}`);
  await redisClient.del(`refresh:${refreshToken}`);
}
