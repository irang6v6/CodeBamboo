import { Inter } from 'next/font/google'
import { useMutation, useQuery } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

const fetchUser = async (code:string) => {
  const BASE_URL = 'http://localhost:8000'
  const response = await fetch(BASE_URL+'/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })
  const data = await response.json()
  return data
}

export default function Kakao() {
  // let code = new URL(window.location.href).searchParams.get("code");
  // const { isLoading, isError, data: seoyong } = useMutation('user', ()=>fetchUser(code))
  // console.log(code)

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (isError) {
  //   return <div>Error fetching user data</div>
  // }

  return (
    <>
    <h1>z</h1>
    </>
  );
}

// yOXSN4F7twnquMh3zj_ZvjXjJo4NXtLBS5sdYYl3qNDnyDhS1W7AqpDxU3Bo6JHu-3vB8gopyNkAAAGHu4BXng