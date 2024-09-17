import { create } from "zustand";
import { User } from "@/app/types/user";

export type UserStore = {
    user: User | undefined;
};

const useUserStore = create<UserStore>((set) => ({
    user: undefined,
}));
export default useUserStore;
