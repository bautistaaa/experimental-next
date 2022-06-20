import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

const sleep = (timeout) => new Promise(res => setTimeout(res, timeout));

export default function UserPage() {
  const router = useRouter()
  const usernameFromQuery = router.query;
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const resp = await fetch('https://api.github.com/repos/bautistaaa/big-sir/stargazers')
      const stars = await resp.json()
      setData(stars)
    }

    fetch()
  }, [])

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      )
    }

    const handleRouteChangeComplete = (url, { shallow }) => {
      console.log(
        `COMPLETE ${url} ${
          shallow ? 'with' : 'without'
        } shallow routing`
      )
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])

  if(!data) {
    return <div>Loading</div>
  }

  return (
    <div className={styles.container}>
      <Link href="/">Home</Link>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}

// UserPage.getInitialProps = async (ctx) => {
//   // server
//   if(ctx.req) {
//     const res = await sleep(3000);
//     return { something: 'here'  }
//   }

//   // client
//   return {  }
// }

// export const getServerSideProps = async (ctx) => {
//   const res = await sleep(2000);
//   return { props: {something: 'here'} }
// }
