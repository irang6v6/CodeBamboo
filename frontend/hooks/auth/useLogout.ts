import { useMutation } from "react-query";
import authApi from "../api/axios.authorization.instance";
import { useSetRecoilState } from "recoil";
import { userDefault, userState } from "@/recoil/user";
import { useRouter } from "next/router";

const useLogout = ()=> {
  const setUser = useSetRecoilState(userState)
  const router = useRouter()
  
  const logoutQueryFn = async () => {
    // 로그아웃 하시겠습니까? 로직 추가..
    try {
      const response = await authApi.post('auth/logout');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  const logoutMutation = useMutation(logoutQueryFn, {
    onSuccess: (data) => {
      console.log(data);
      localStorage.removeItem('access_token');
      localStorage.removeItem('provider');
      setUser(userDefault);
      router.push('/');
    },
  });

  return logoutMutation
}

export default useLogout
// barItems에 사용법 있습니다.