import crypto from "crypto";

interface JWTPayload {
  [key: string]: unknown;
  exp?: number; 
}

export function signJWT(payload: JWTPayload, secret: string): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const base64url = (input: string | Buffer): string =>
    Buffer.from(input)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));

  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${data}.${signature}`;
}
