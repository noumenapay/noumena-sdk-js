import {HmacSHA256, enc} from 'crypto-js'

interface NoumenaObj {
    method: string;
    apiKey: string;
    apiSecret: string;
    path: string;
    reqBody?: ReqBody;
}

interface ReqBody {
    [key: string]: any;
}

const getBodyString = (reqBody?: ReqBody): string => {
    if (reqBody) {
        const keys = Object.keys(reqBody).sort();
        return keys.reduce((result, cur) => `${result}&${cur}=${reqBody[cur]}`, '').substring(1);
    }
    return '';
};

const getSignature = ({method, apiKey, apiSecret, path, reqBody}: NoumenaObj, now: number) => {
    const bodyStr = getBodyString(reqBody);
    const data = `${now}${method}${apiKey}${path}${bodyStr}`;
    const hash = HmacSHA256(data, apiSecret);
    return enc.Base64.stringify(hash);
};

const generateAuth = (noumenaObj: NoumenaObj): string => {
    const now = Date.now();
    return `Noumena:${noumenaObj.apiKey}:${now}:${getSignature(noumenaObj, now)}`;
};

export default generateAuth;

export {
    getBodyString,
    getSignature,
    generateAuth
};
