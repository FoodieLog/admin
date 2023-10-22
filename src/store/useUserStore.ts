import { create } from "zustand";

interface UserStore {
  userId: number;
  nickName: string;
  status: string;
  setUserId: (userId: number) => void;
  setNickName: (nickName: string) => void;
  setStatus: (status: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userId: 0,
  nickName: "",
  status: "",
  setUserId: (userId) => set({ userId }),
  setNickName: (nickName) => set({ nickName }),
  setStatus: (status) => set({ status }),
}));

export default useUserStore;
