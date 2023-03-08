import { regionsUrl } from "./environment";

export const getRegions = async () => {
    const url = regionsUrl
    try {
        let response: any = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(params),
        });
        console.log(response);
          var responseJson = await response.json()
        return responseJson
    } catch (response: any) {
        console.log('error:', response.message)
    }
}