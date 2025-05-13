import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret_session_key = process.env.SECRET_SESSION_KEY;
const encodedKey = new TextEncoder().encode(secret_session_key);

export async function token_encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function token_decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session");
  }
}

export async function newSession(token) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session_token = await token_encrypt({
    token,
  });

  cookies().set("session_token", session_token, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return {
    success: true,
  };
}

export async function get_server_session() {
  const session_token = cookies().get("session_token")?.value;
  if (!session_token) return null;
  return await token_decrypt(session_token);
}

export async function destroyServerSession() {
  cookies().set("session_token", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
    sameSite: "lax",
    path: "/",
  });

  const cleared = cookies().get("session_token");

  return !cleared || cleared.value === "";
}

export async function serverAuth() {
  const session = await get_server_session();

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(session);
    }, 1000)
  );
}
