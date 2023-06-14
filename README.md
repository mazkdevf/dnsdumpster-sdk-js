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

# Contributing

Welcome to the Unofficial DNSDumpster API! I appreciate your interest in contributing. Whether you want to report a bug, suggest a new feature, or submit improvements to the codebase.

## Issues

If you come across any issues or have a bug to report, please feel free to [open an issue](https://github.com/mazkdevf/dnsdumpster-sdk-js/issues). Make sure to provide detailed information about the problem you encountered, including steps to reproduce it if possible.

## Pull Requests

We gladly accept Pull Requests (PRs) from the community. If you have an enhancement or fix you'd like to contribute, follow these steps:

1. Fork the repository and create your branch from `master`.
2. Make your changes, ensuring the code follows our coding conventions and guidelines.
3. Test your changes to make sure they work as intended.
4. Commit your changes and provide a clear and descriptive commit message.
5. Push your branch to your forked repository.
6. Open a Pull Request to the `master` branch of our repository.
7. Provide a detailed description of the changes you made in the PR, including any related issue numbers.

We will review your PR as soon as possible.

## Code Style

To maintain a consistent code style throughout the project, please adhere to the following guidelines:

- Write clear and concise comments to explain the code's intent where necessary.
- Before submitting a PR, ensure your code passes any existing tests and write new tests for any added functionality.

Thank you for considering contributing to this project.

