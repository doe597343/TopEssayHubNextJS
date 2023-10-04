import '../styles/globals.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
import Head from 'next/head'
import Layout from '../components/layout'
import {DEFAULT_META} from '../constants/Item'


import { Partytown } from '@builder.io/partytown/react';
import { useRouter } from 'next/router'


export default function App({ Component, pageProps }) {

  console.log(pageProps)
  const router = useRouter()
  const canonical = process.env.NEXT_PUBLIC_BASE_URL + (router.asPath === '/' ? ''  : router.asPath);

  let title = pageProps?.data?.title ? pageProps?.data?.title : DEFAULT_META.title
  let meta_title = pageProps?.data?.seo?.description ? pageProps?.data?.seo?.description : DEFAULT_META.description
  let meta_description = pageProps?.data?.seo?.description ? pageProps?.data?.seo?.description : DEFAULT_META.description
  let meta_keywords = pageProps?.data?.seo?.keywords ? pageProps?.data?.seo?.keywords : DEFAULT_META.keywords
  return (
    
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="title" content={meta_title} />
        <meta name="description" content={meta_description} />
        {/* <meta name="keywords" content={meta_keywords} /> */}
        <meta name="author" content="TopEssayHub Team" />

        <meta itemprop="name" content={meta_title}/>
        <meta itemprop="description" content={meta_description}/>
        <meta itemprop="image" content="https://www.topessayhub.com/og-image.png"/>
        <meta name="robots" content="index,follow"/>

        <meta property="og:url" content="https://topessayhub.com"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={meta_title}/>
        <meta property="og:description" content={meta_description}/>
        <meta property="og:image" content="https://topessayhub.com/og-image.png"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={meta_title}/>
        <meta name="twitter:description" content={meta_description}/>
        <meta property="twitter:image" content="https://topessayhub.com/og-image.png"/>
        {/* <meta name="twitter:site" content="@topessayhub"/> */}
        <meta name="twitter:domain" content="https://www.topessayhub.com"/>
        <meta property="twitter:url" content="https://www.topessayhub.com"/>
        <meta name="twitter:url" content="https://www.topessayhub.com"/>
        
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
        <link rel="canonical" href={canonical}></link>

        <Partytown debug={true} forward={['dataLayer.push']} />
        <script
          type="text/partytown"
          src={`https://www.googletagmanager.com/gtag/js?id=G-MJ7ECF5TW8`}
        />
         <script
            type="text/partytown"
            dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    window.gtag = function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-MJ7ECF5TW8', { 
                        page_path: window.location.pathname,
                    });
                `,
            }}
        />

          <script dangerouslySetInnerHTML={{
                __html: `(function(i,s,o,g,r,a,m){i['TDConversionObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script', 'https://svht.tradedoubler.com/tr_sdk.js?org=2359216&prog=344680&dr=true&rand=' + Math.random(), 'tdconv');`
          }} />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}