import { avatarIcon } from "@/components/assets/images";

export const useUserMessage = () => {
  const addUserMessage = (value: string) => ({
    value,
    avatar: avatarIcon,
    name: "John Doe",
  });
  return { addUserMessage };
};
