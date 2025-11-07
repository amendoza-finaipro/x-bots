import { type ComponentProps } from "react";

type HeadingProps = ComponentProps<"h1">;
type ParagraphProps = ComponentProps<"p">;
type UlListProps = ComponentProps<"ul">;
type OlListProps = ComponentProps<"ol">;
type ListItemProps = ComponentProps<"li">;
type AnchorProps = ComponentProps<"a">;

export const MDComponents = {
  h1: (props: HeadingProps) => (
    <h1
      {...props}
      className="text-xl font-medium pb-2"
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      {...props}
      className="pt-4 text-xl font-medium pb-2"
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      {...props}
      className="text-xl font-medium pb-2"
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      {...props}
      className="text-xl font-medium"
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      {...props}
      className="text-sm pb-2"
    />
  ),
  em: (props: ComponentProps<"em">) => <em {...props} />,
  strong: (props: ComponentProps<"strong">) => (
    <strong
      {...props}
      className="font-bold"
    />
  ),
  a: ({ href, children, ...props }: AnchorProps) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-indicator transition-colors hover:text-blue-400 dark:hover:text-blue-100"
      {...props}
    >
      {children}
    </a>
  ),
  ul: (props: UlListProps) => (
    <ul
      {...props}
      className="list-disc pl-6"
    />
  ),
  ol: (props: OlListProps) => (
    <ol
      {...props}
      className="list-decimal pl-6"
    />
  ),
  li: (props: ListItemProps) => (
    <li
      {...props}
      className="text-sm pb-1"
    />
  ),
};
