import LoginUser from "@/api/auth/auth";
import { useApplication } from "@/store/useApplication";
import { AuthStorage } from "@/utils/AuthStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useApplicationHook = () => {
  const { user, login, logout, loadingApp, changeLoading, afterLogin } = useApplication();

  useEffect(() => {
    if (!user) {
      const checkUser = AuthStorage.isAuth();
      if (checkUser) {
        login(checkUser);
      } else {
        changeLoading(false);
      }
    } else {
      AuthStorage.authenticate(user);
    }
  }, [user]);

  const logoutApp = async () => {
    if (!user) return;
    /* service for logout user  */
    await AuthStorage.clearToken(() => logout());
  };

  const signin = async (email: string, password: string) => {
    /* service for signin user  */
    const user = await new LoginUser().execute({ email, password });
    login(user);
    return user;
  };

  return {
    user,
    signin,
    logoutApp,
    loadingApp,
    afterLogin
  };
};
