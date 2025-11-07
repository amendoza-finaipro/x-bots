import { useEffect, useState } from "react";

interface Params {
  fullText?: string;
  typingSpeed?: number;
}
export const useWriteText = ({ fullText, typingSpeed = 5 }: Params) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!fullText) return;

    setText("");

    let index = 0;

    const typingAnimation = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingAnimation);
      }
    }, typingSpeed);

    // Cleanup function to prevent memory leaks
    return () => clearInterval(typingAnimation);
  }, [fullText, typingSpeed]);

  return { text };
};
