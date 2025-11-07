"use server";

import { EmailClient, type EmailMessage } from "@azure/communication-email";
import { render } from "@react-email/render";

import OtpEmail from "@/components/email/OtpEmail";
import { env } from "~/lib/env";


interface EmailParams {
  message: EmailMessage;
}

const SENDER_ADDRESS = "DoNotReply@c6cc3d20-e294-45a2-84c8-70becd11787e.azurecomm.net";

export const sendEmail = async ({ message }: EmailParams) => {
  const endpoint = `endpoint=${env.AZURE_COMMUNICATION_EMAIL_ENDPOINT}/;accessKey=${env.AZURE_COMMUNICATION_EMAIL_ACCESS_KEY}`;

  const emailClient = new EmailClient(endpoint);

  const poller = await emailClient.beginSend(message);
  const response = await poller.pollUntilDone();
  if (!response) {
    throw new Error("Failed to send email");
  }
};

interface BaseEmailParams {
  name: string;
  email: string;
}

interface VerificationEmailParams extends BaseEmailParams {
  otp: string;
}

export const sendOptEmail = async ({
  name,
  otp,
  email,
}: VerificationEmailParams) => {
  const message: EmailMessage = {
    senderAddress: SENDER_ADDRESS,
    content: {
      subject: "X Bots - OPT de autenticación",
      html: await render(
        <OtpEmail
          name={name}
          otp={otp}
        />,
      ),
    },
    recipients: {
      to: [{ address: email, displayName: name }],
    },
  };

  return sendEmail({ message });
};