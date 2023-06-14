# DNSDumpster.com Unofficial JS API

## Installation
You can install this Unofficial JS API from npm like this:
1. Open your project and run command `npm i dnsdumpster` this will install the module.
2. Use this code to initialize dnsdumpster class:
```js
const dns = require('dnsdumpster');
const dnsPrivate = new dns();
```
3. All done now you can call the function what you want from after this.

## Installation for source
1. Clone this repository 
2. Extract this files to your project
3. Add this code to your project to initialize dnsdumpster class:
```js
const dns = require('./dnsClass');
const dnsPrivate = new dns();
```
4. All done now you can call the function of your choice after this.


### Get Information about this package & DNSDumpster
```js
dnsPrivate.info().then((info) => {
    console.log("\"" + info.name + "\"");
    console.log("\nDescription: " + info.description)
    console.log("\nVersion: " + info.version);
});
```

### Get Information about domain
```js
await dnsPrivate.get('google.com').then((results) => {
    if (results.success) {
        results.data.forEach((result) => {
            console.log(result);
        });
    } else {
        console.log(results);
    }
}).catch((err) => {
    console.log({ error: err });
});
```

**Example output for that ^^**
```json
{
    "success": true,
    "data": [
        {
            "detail": "DNS Servers",
            "data": [
                {
                    "domain": "ns1.google.com",
                    "ip": "ipv4",
                    "provider": "GOOGLE"
                },
                {
                    "domain": "ns4.google.com",
                    "ip": "ipv4",
                    "provider": "GOOGLE"
                },
                {
                    "domain": "ns3.google.com",
                    "ip": "ipv4",
                    "provider": "GOOGLE"
                },
                {
                    "domain": "ns2.google.com",
                    "ip": "ipv4",
                    "provider": "GOOGLE"
                }
            ]
        },
        {
            "detail": "MX Records",
            "data": [
                {
                    "priority": "10",
                    "domain": "smtp.google.com",
                    "ip": "ipv4",
                    "provider": "GOOGLE"
                }
            ]
        },
        {
            "detail": "TXT Records",
            "data": [
                "apple-domain-example",
                "google-site-verification=example",
            ]
        },
        {
            "detail": "Host Records",
            "data": [
                {
                    "domain": "google.com",
                    "ip": "ipv4",
                    "provider": "GOOGLE"
                },
                {
                    "domain": "example.google.com",
                    "ip": "ipv4",
                    "provider": "GOOGLE"
                }
            ]
        }
    ]
}
```
