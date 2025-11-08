import { Column, Container, Row, Text } from "@react-email/components";
import { BaseEmail } from "./BaseEmail";
import { ContainerSection } from "./ContainerSection";

interface OtpEmailProps {
  name: string;
  otp: string;
}

export const OtpEmail = ({ name, otp }: OtpEmailProps) => {
  return (
    <BaseEmail previewText="Tu código de verificación">
      <ContainerSection>
        <Row className="mb-2">
          <Text className="text-base">Hola {name},</Text>
          <Text className="pb-5 text-base">
            Usa el siguiente código completar el proceso de autenticación:
          </Text>

          <Container className="flex justify-center items-center py-6">
            <Text className="text-4xl font-bold tracking-widest text-blue-600">
              {otp}
            </Text>
          </Container>

          <Text className="pt-5 text-sm text-gray-600">
            Este código es válido solo por unos minutos. Si no solicitaste esta verificación, puedes ignorar este mensaje.
          </Text>
        </Row>

        <Row>
          <Column>
            <Text className="text-base">Saludos cordiales,</Text>
            <Text className="text-base">X Bots</Text>
          </Column>
        </Row>
      </ContainerSection>
    </BaseEmail>
  );
};

OtpEmail.PreviewProps = {
  name: "Camilo",
  otpCode: "482913",
};

export default OtpEmail;
