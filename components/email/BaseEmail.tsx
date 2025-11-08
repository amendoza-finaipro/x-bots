import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Preview,
  Tailwind,
} from "@react-email/components";
import { ContainerSection } from "./ContainerSection";
import { Logo } from "../assets/icons";

interface Props {
  children: React.ReactNode;
  previewText: string;
}

export const BaseEmail: React.FC<Props> = ({ children, previewText }) => (
  <Html>
    <Head>
      <Font
        fontFamily="Arial"
        fallbackFontFamily="sans-serif"
        fontStyle="normal"
      />
    </Head>
    <Preview>{previewText}</Preview>
    <Tailwind>
      <Body className="bg-gray-100">
        <Container>
          <ContainerSection align="center">
            <h1 className="font-bold">X-Bots Studio</h1>
          </ContainerSection>
          {children}
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export const BaseEmailConecteaLogo: React.FC<Props> = ({
  children,
  previewText,
}) => (
  <Html>
    <Head>
      <Font
        fontFamily="Arial"
        fallbackFontFamily="sans-serif"
        fontStyle="normal"
      />
    </Head>
    <Preview>{previewText}</Preview>
    <Tailwind>
      <Body className="bg-gray-100">
        <Container>
          <ContainerSection align="center">
            <Img
              src="https://images.ctfassets.net/j6edr7jhjwvz/5OjfqLAt3qHkZyaOLA5YZZ/ff1450734cacf13efa9218323334e784/logo-fundacion-conectea.png"
              alt="Fundación ConecTEA"
              width={370}
            />
          </ContainerSection>
          {children}
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
