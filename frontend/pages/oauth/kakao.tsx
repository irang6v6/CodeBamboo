import { Inter } from 'next/font/google'
import { useQuery } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

const fetchUser = async () => {
  const BASE_URL = 'http://localhost:8000'
  const response = await fetch(BASE_URL+'/users/1', {
    method: 'GET',
  })
  const data = await response.json()
  return data
}

export default function Kakao() {

  const { isLoading, isError, data: seoyong } = useQuery('user', fetchUser)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching user data</div>
  }

  return (
    <>
    <h1>z</h1>
    </>
  );
}
