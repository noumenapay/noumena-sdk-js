import axios from 'axios'
import generateAuth from '../index';

describe('Test kyc', function () {
    it('test get', function () {
        const url = '/api/v1/customers/accounts?acct_no=1&page_num=1&page_size=20';
        const apiKey = '14db63d7f3614664ad1c71dd134a21dc';
        const apiSecret = 'ed8cb3a0-8365-4340-9d9c-33f051eedccd';
        const p = axios(`https://uat.noumena.pro${url}`, {
            headers: {
                Authorization: generateAuth({
                    method: 'GET',
                    apiKey: apiKey,
                    apiSecret: apiSecret,
                    path: url
                }),
                'Access-Passphrase': '12345678a'
            }
        });
        return p.then(function (res) {
            expect(res.data.code).toBe(0);
        })
    });
    it('test post', function () {
        const url = '/api/v1/customers/accounts';
        const apiKey = '14db63d7f3614664ad1c71dd134a21dc';
        const apiSecret = 'ed8cb3a0-8365-4340-9d9c-33f051eedccd';
        const reqBody = {
            "acct_name": "test01@noumena.pro",
            "acct_no": `mock${Date.now()}`,
            "address": "street 1",
            "back_doc": "no",
            "bank_id": "1002",
            "birthday": 0,
            "city": "moon",
            "country": "A",
            "country_code": "96",
            "doc_no": "1234",
            "doc_type": "1",
            "first_name": "micky",
            "front_doc": "no",
            "gender": "male",
            "kyc_info": "string",
            "last_name": "Wang",
            "maiden_name": "mom",
            "mail": "test01@noumena.pro",
            // "mail_token": "123456",
            // "mail_verification_code": "123456",
            "mix_doc": "no",
            "mobile": "1582170000",
            "nationality": "A",
            "state": "moon",
            "zipcode": "123456"
        };
        const p = axios(`https://uat.noumena.pro${url}`, {
            method: 'post',
            headers: {
                Authorization: generateAuth({
                    method: 'POST',
                    apiKey: apiKey,
                    apiSecret: apiSecret,
                    path: url,
                    reqBody
                }),
                'Access-Passphrase': '12345678a'
            },
            data: reqBody
        });
        return p.then(function (res) {
            expect(res.data.code).toBe(0);
        })
    });
});
