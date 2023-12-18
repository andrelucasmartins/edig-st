"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
const USER_CONSENT_COOKIE_KEY = "cookie_consent";
export const getConsent = async () => {
  const result = cookies().get(USER_CONSENT_COOKIE_KEY);
  return result;
};

export const setConsent = async () => {
  const oneYear = 24 * 60 * 60 * 365;
  cookies().set(USER_CONSENT_COOKIE_KEY, "true", {
    maxAge: oneYear,
  });

  revalidatePath("/");
};
