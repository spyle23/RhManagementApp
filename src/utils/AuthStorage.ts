import { User } from "@/types/user";

export const AuthStorage = {
  isAuth:  () => {
    try {
      const val = localStorage.getItem("rh-app");
      return val ? JSON.parse(val) as User : undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
  authenticate: (
    user: any,
    callback?: (data: any) => void
  ) => {
    const jsonValue = JSON.stringify(user);
    localStorage.setItem("rh-app", jsonValue);
    callback && callback(user);
  },
  clearToken: (callback: () => void) => {
    localStorage.clear();
    callback();
  },
};
