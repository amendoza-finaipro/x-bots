import { avatarIcon } from "@/components/assets/images";
import { userMockData } from "~/data";

export const useUserMessage = () => {
  const addUserMessage = (value: string) => ({
    value,
    avatar: avatarIcon,
    name: userMockData.name,
  });
  return { addUserMessage };
};
