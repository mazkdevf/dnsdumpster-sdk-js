const fetch = require('node-fetch');
const cheerio = require('cheerio');
const version = require('./package.json').version;

class DnsPrivate {
    constructor() {
        this.mainUrl = 'https://dnsdumpster.com/';
    }

    info = () => new Promise(async (resolve, reject) => {
        resolve({
            name: "DNSDumpster NodeJS non-official SDK",
            description: "DNS Dumpster is a free domain research tool that can discover hosts related to a domain. Finding visible hosts from the attackers perspective is an important part of the security assessment process.",
            version: version
        })
    });

    get = (ip_or_domain) => new Promise(async (resolve, reject) => {
        await fetch(this.mainUrl)
            .then(res => res.text())
            .then(async body_ => {
                const $ = cheerio.load(body_);
                const csrf = $('input[name="csrfmiddlewaretoken"]').val();

                const response = await fetch(this.mainUrl, {
                    method: 'post',
                    headers: {
                        referer: this.mainUrl,
                        cookie: "csrftoken=" + csrf,
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        csrfmiddlewaretoken: csrf,
                        targetip: ip_or_domain,
                        user: 'free',
                    }).toString()
                }).catch(err => reject(err));
                const body = await response.text();

                const $2 = cheerio.load(body);

                if ($2('body').text().includes('Too many requests from your IP address')) return reject("Too many requests from your IP address");
                if (!$2('.col-md-12').length) return reject("Failed to parse data");

                var results = [];

                const tables = $2('.col-md-12').find('table');
                tables.each((i, table) => {
                    var p = $2(table).parent().prev('p').text();

                    if (p.includes('MX')) p = "MX Records";
                    else if (p.includes('Host Records')) p = "Host Records"
                    else if (p.includes('TXT Records')) p = "TXT Records"

                    const rows = $2(table).find('tr');

                    var currentT = {
                        detail: p,
                        data: []
                    }

                    rows.each((j, row) => {
                        const columns = $2(row).find('td');

                        var col = [];
                        columns.each((k, column) => {
                            var text = $2(column).contents().filter(function () {
                                return this.nodeType == 3;
                            }).text();

                            var save = text.replace(/(\r\n|\n|\r)/gm, "");

                            if (currentT.detail.includes("Host Records") || currentT.detail.includes("MX Records") || currentT.detail.includes("DNS Servers")) {
                                col.push({
                                    id: k,
                                    data: save
                                })
                            } else {
                                col.push(save);
                            }
                        });

                        if (currentT.detail.includes("Host Records") || currentT.detail.includes("MX Records") || currentT.detail.includes("DNS Servers")) {
                            for (var i = 0; i < col.length; i++) {
                                if (i == 0) {
                                    if (currentT.detail.includes("MX Records")) {
                                        var split = col[i].data.split(" ");
                                        var priority = split[0];
                                        var domain = split[1];
                                        if (domain[domain.length - 1] == ".") domain = domain.slice(0, -1);

                                        currentT.data.push({
                                            priority: priority,
                                            domain: domain
                                        });
                                    } else if (currentT.detail.includes("DNS Servers")) {
                                        var domain = col[i].data;
                                        if (domain[domain.length - 1] == ".") domain = domain.slice(0, -1);
                                        currentT.data.push({
                                            domain: domain
                                        });
                                    } else {
                                        var domain = col[i].data;
                                        if (domain[domain.length - 1] == ".") domain = domain.slice(0, -1);
                                        else if (domain[domain.length - 1] == " ") domain = domain.slice(0, -1);
                                        currentT.data.push({
                                            domain: domain
                                        });
                                    }
                                } else if (i == 1) {
                                    currentT.data[currentT.data.length - 1].ip = col[i].data;
                                } else if (i == 2) {
                                    currentT.data[currentT.data.length - 1].provider = col[i].data;
                                }
                            }
                        } else if (currentT.detail.includes("TXT Records")) {
                            currentT.data.push(...col);
                        } else {
                            currentT.data.push(col);
                        }
                    });

                    results.push(currentT);
                });

                resolve({
                    success: true,
                    data: results
                });
            }).catch(err => {
                reject(err);
            })
    });
}

module.exports = DnsPrivate;