
import { apiHelper } from "./ApiHelper";
import {SITEMAP_INDEX_FILES} from '../constants/Item'

export const generateSitemapIndex = async () => {
    return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${SITEMAP_INDEX_FILES.map(file => {
                return `
                <sitemap>
                    <loc>https://topessayhub.com/${file.loc}</loc>
                    <lastmod>${file.lastmod}</lastmod>
                </sitemap>
            `}).join('')}
        </sitemapindex>
    `    
}


export const generateSiteMap = async (pageType) => {

    const res = await apiHelper(`page/sitemap?page_type=${pageType}`, 'GET', null)
    if(res.data.status){
        const urls = res.data.data;

        return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls
            .map(url => {
                let loc = url.loc == 'index' ? '' : `/${url.loc}`;
                return `
            <url>
                    <loc>https://topessayhub.com${loc}</loc>
                    <lastmod>${url.lastmod}</lastmod>
                    <changefreq>${url.changefreq}</changefreq>
                    <priority>${url.priority}</priority>
            </url>
            `;
            })
            .join('')}
        </urlset>
        `;
    }
 
}
