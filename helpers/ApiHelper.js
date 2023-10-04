import axios from 'axios';


// const url = 'http://localhost:3023/'
// const url = "https://topessayhub-22051.nodechef.com/";

export const  apiHelper = async (api, method, data, headers) => {
    console.log('apihelper headers === ', headers)
    
    const response = await axios({
        method: method,
        url: process.env.NEXT_PUBLIC_API_URL + "/" + api,
        data: data,
        headers: headers
    })
    
    return response;
}
