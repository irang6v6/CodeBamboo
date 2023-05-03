import { useQuery } from 'react-query'
import { LeafItem } from '@/components/LeafItem'
import { UserItem } from '@/components/UserItem'
import { useRecoilState } from 'recoil'
import { userState } from '@/recoil/user'
import Modal from '@/components/common/Modal'
import { useState } from 'react'

const fetchUser = async () => {
  const BASE_URL = 'http://localhost:8000'
  const response = await fetch(BASE_URL+'/users/1', {
    method: 'GET',
  })
  const data = await response.json()
  return data
}

export default function Home() {
  const [user, setUser] = useRecoilState(userState)

  return (
    <>
      <h1 className="text-3xl underline text-bamboo font-scp font-bold">
        Tailwind CSS rules!
      </h1>
      <div>
        <ol>
          <img src={user?.image} alt="" className='h-24'/>
          <li>닉네임: {user?.nickname}</li>
          <li>이메일: {user?.email}</li>
          <li>자기소개: {user?.introduce}</li>
          {user.isLoggedIn?
          <li>소셜로그인: {user?.provider}</li>
          :
          <li>로그인 상태 : false</li>
          }
        </ol>
      </div>
      <LeafItem />
      <UserItem />
      <Modal/>
    </>
  );
}
