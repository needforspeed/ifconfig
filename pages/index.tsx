import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
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

        <h2>General Information</h2>
        <div>
          {
            data.geo ?
            (
              <div className='d-flex align-items-center'>
                <div className='font-bold'>Location</div>
                <div>
                  :&nbsp;{data.geo.city}, {data.geo.region}, {data.geo.country}&nbsp;
                </div>
                <div>
                  <Image alt={`${data.geo.country} flag`} src={`https://flagcdn.com/96x72/${data.geo.country.toLowerCase()}.png`} width={32} height={32}/>
                </div>
              </div>
            ) :
            ''
          }
          <div className='d-flex'>
            <div className='font-bold'>IP</div>
            <div>:&nbsp;{data.ip}</div>
          </div>
          <div className='d-flex'>
            <div className='font-bold'>User Agent</div>
            <div>:&nbsp;{data.ua}</div>
          </div>
        </div>

        <h2>APIs</h2>
        <div>
          <div>
            <Link href="/api/ip">
              <a>IP -&gt;</a>
            </Link>
          </div>
          <div>
            <Link href="/api/geo">
              <a>Geo -&gt;</a>
            </Link>
          </div>
          <div>
            <Link href="/api/ua">
              <a>User Agent -&gt;</a>
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
