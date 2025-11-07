import { Column, Heading, Hr, Row, Section } from "@react-email/components";

interface Props {
  title?: string;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}
export const ContainerSection: React.FC<Props> = ({
  title,
  children,
  align = "left",
}) => (
  <Section className="mb-2 rounded bg-white p-4">
    <Row>
      <Column align={align}>
        {title && (
          <>
            <Heading
              className="text-base font-bold"
              as="h2"
            >
              {title}
            </Heading>
            <Hr className="border-[#d8d8d8]" />
          </>
        )}
        {children}
      </Column>
    </Row>
  </Section>
);
