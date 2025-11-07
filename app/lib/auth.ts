import { betterAuth } from "better-auth";
import { Pool } from "pg";

import { env } from "./env";

import { emailOTP } from "better-auth/plugins";
import { sendOptEmail } from "~/actions/email";

export const auth = betterAuth({
  database: new Pool({
    connectionString: `postgres://${env.BETTER_AUTH_DB_USER}:${env.BETTER_AUTH_DB_PASSWORD}@${env.BETTER_AUTH_DB_SERVER}:${env.BETTER_AUTH_DB_PORT}/${env.BETTER_AUTH_DB_NAME}${env.BETTER_AUTH_DB_SSL === "true" ? "?ssl=true" : ""}`,
  }),
  // emailAndPassword: {
  //   enabled: true,
  //   requireEmailVerification: true,
  //   sendResetPassword: async ({ url, user }) => {
  //     const { email, name } = user;
  //     await sendResetPasswordEmail({ url, email, name });
  //   },
  // },
  // socialProviders: {
  //   google: {
  //     clientId: env.GOOGLE_CLIENT_ID,
  //     clientSecret: env.GOOGLE_CLIENT_SECRET,
  //     mapProfileToUser: (profile) => ({
  //       name: profile.given_name.split(" ")[0],
  //       lastname: profile.family_name,
  //     }),
  //   },
  // },
  // emailVerification: {
  //   sendVerificationEmail: async ({ url, user }) => {
  //     const { email, name } = user;
  //     await sendVerificationEmail({ url, email, name });
  //   },
  // },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        sendOptEmail({name: email, otp, email});
        console.log(`Sending ${type} OTP to ${email}: ${otp}`);
      }
    })
  ]
});
