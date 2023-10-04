
import {generateSiteMap} from '../helpers/sitemapHelper';


export default function Index() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {

  const pageType = 'basic-pages'
  const sitemap = await generateSiteMap(pageType);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

