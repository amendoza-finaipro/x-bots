import { betterAuth } from "better-auth";
import { Pool } from "pg";

import { env } from "./env";

import { emailOTP } from "better-auth/plugins";
import { sendOtpEmail } from "~/actions/email";

export const auth = betterAuth({
  database: new Pool({
    connectionString: `postgres://${env.BETTER_AUTH_DB_USER}:${env.BETTER_AUTH_DB_PASSWORD}@${env.BETTER_AUTH_DB_SERVER}:${env.BETTER_AUTH_DB_PORT}/${env.BETTER_AUTH_DB_NAME}${env.BETTER_AUTH_DB_SSL === "true" ? "?ssl=true" : ""}`,
  }),
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        sendOtpEmail({name: email, otp, email});
        console.log(`Sending ${type} OTP to ${email}: ${otp}`);
      }
    })
  ]
});
