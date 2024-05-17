import { create } from "zustand";
import api from '../services/api'

export type User = {
  id: number;
  name: string;
  email: string;
  userName: string;
  password: string;
  phone: string;
  receipt: Blob | null;
  receiptConfirmed: number;
  userImage: Blob | null;
}

type UserModel = {
  users: User | null;
  getAllUser: () => Promise<User[]>;
  addToUser: (id : number) => Promise<void>;
  teste: () => Promise<void>;
}

export const useUser = create<UserModel>((set) => ({
  users: null,
  getAllUser: async () => {
    const resolve = await api.get('/user/GetAll');
    return resolve.data;
  },
  addToUser: async (id: number) => {
    console.log("AddToUserFunction!");
    const resolve = await (await api.get(`/user/GetById/${id}`)).data.user
    set(() => ({users: resolve}));
  },
  teste: async () => {
    await new Promise((resolve) => setTimeout(resolve,1000));
  }

}));