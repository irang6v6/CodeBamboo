import { atom, selector } from "recoil";

export interface userObject {
  isLoggedIn: boolean;
  email: string;
  image: string;
  introduce: string | null;
  nickname: string;
  provider: string;
  user_id: number;
}

export const userState = atom<userObject>({
  key: "userState", // 선언명과 같지 않아도 됨, 그래도 통일하면 좋을 듯
  default: {
    isLoggedIn: false,
    email: "Panda123@codeBamboo.site",
    image:
      "https://ssl.pstatic.net/static/pwe/address/img_profile.png",
    introduce: "Hello, Bamboos!",
    nickname: "Panda123",
    provider: "kakao",
    user_id: 999,
  },
});

// 컴포넌트에서의 사용
// const [example, setExample] = useRecoilState(exampleState); // 인자에는 key 값
// const example = useRecoilValue(exampleState)
// const setExample = useSetRecoilState(exampleState) 과 같은 방식으로 하나씩만 호출할 수도 있음
// useState 와 같은 방식으로 상태 관리 가능

// export const handleUserState = selector({
//   key: "handleUserState", // selector 고유의 키 값
//   get: ({ get }) => {
//     const prev = get(userState); // get으로 다른 여러 atom이나 selector를 불러올 수 있고 useEffect처럼 get 안의 인자가 변하면 해당 selector가 실행됨
//     return prev;
//   },
// });
