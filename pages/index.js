import Head from 'next/head'
import Login from './Login';

export default function Home() {
  return (
    <div >
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex - developed by Paulo Avila" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div >
  )
}
