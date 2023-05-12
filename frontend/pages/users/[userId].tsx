import { useRouter } from "next/router";
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { OthersPage } from '@/components/user/OthersPage';
import { MyPage } from '@/components/user/MyPage';

interface Props {
}

export const UserDetail = ({ } : Props) => {
  const me = useRecoilValue(userState)
  const router = useRouter();
  const {userId} = router.query
  // next router에서는 query변수가 string || string[]이기 때문에,
  // 명시적으로 string이라고 지정을 해줘야지. ts가 오류를 출력하지 않는다.
  let stringUserId = Array.isArray(userId) ? userId[0] : userId;
  
  if(stringUserId && +stringUserId !== me.user_id) {
    return <OthersPage userId={stringUserId}/>
  } 

  return <MyPage/>
};

export default UserDetail
