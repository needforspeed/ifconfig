import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import requestIp from 'request-ip';
import geoipLite, { Lookup } from 'geoip-lite';

const Home: NextPage<{data: {ip: string, geo: Lookup, ua: string}}> = ({data}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ifconfig</title>
        <meta name="description" content="ifconfig" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="http://ifconfig.zhang-consulting.com">ifconfig</a>
        </h1>

        <div className='container'>
          <div>
            <span className='font-bold'>IP</span>:&nbsp;
            <span>{data.ip}</span>
          </div>
          <div>
            <span className='font-bold'>Location</span>:&nbsp;
            <span>{data.geo ? `${data.geo.city} ${data.geo.region} ${data.geo.country}` : ''}</span>
          </div>
          <span className='font-bold'>User Agent</span>:&nbsp;
          <span>{data.ua}</span>
        </div>

        <h2>APIs</h2>
        <div>
          <div>
            <Link href="/api/ip">
              <a>IP</a>
            </Link>
          </div>
          <div>
            <Link href="/api/geo">
              <a>Geo</a>
            </Link>
          </div>
          <div>
            <Link href="/api/ua">
              <a>User Agent</a>
            </Link>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.zhang-consulting.com" target="_blank" rel="noreferrer">
          Powered by Zhang Consulting Corp
        </a>
      </footer>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps (ctx: any) {
  const {req} = ctx
  const ip = requestIp.getClientIp(req) as string
  const geo = geoipLite.lookup(ip)
  const ua = req.headers['user-agent']
  // Pass data to the page via props
  const data = { ip, geo, ua };
  return { props: { data } }
}

export default Home
