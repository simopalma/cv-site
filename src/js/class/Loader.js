import _ from 'underscore';
import rest from 'rest';
import mime from 'rest/interceptor/mime';
import Item from '../class/Item';
import Information from '../class/Information';

const client = rest.wrap(mime);

export default class ItemsLoader {

    constructor() {
        this.items = [];
        this.informations = [];
    }

    load(endpoint, callback) {
        if (_.isEmpty(this.items)) {
            switch (endpoint.type) {
            case 'SPREADSHEETS':
                this.googleSpreadsheets(endpoint.url, callback);
                break;
            case 'INFORMATIONS':
                this.googleSpreadsheetsInformation(endpoint.url, callback);
                break;
            case 'JSON':
                this.json(endpoint.url, callback);
                break;
            default:
                break;
            }
        } else {
            callback(this.items);
        }
    }

    json(url, callback) {
        client(url).then((response) => {
            _.map(response.entity, (item) => {
                this.items.push(new Item(item));
            });
            callback(this.items);
        });
    }

    googleSpreadsheets(url, callback) {
        const script = document.createElement('script');
        script.id = 'spreadsheets';
        script.src = url.replace('{1}', script.id);

        if (document.getElementById(script.id) === null) {
            window[script.id] = ((jsonData) => {
                delete window[script.id];

                const convertEntryToItem = (entry) => {
                    const item = {};
                    const rx = /^gsx\$(.*)$/;
                    _.map(entry, (value, key) => {
                        if (rx.test(key)) {
                            item[rx.exec(key)[1]] = value.$t;
                        }
                    });

                    return new Item(item);
                };

                _.map(jsonData.feed.entry, (entry) => {
                    const item = convertEntryToItem(entry);
                    this.items.push(item);
                });

                callback(this.items);
            });

            document.head.appendChild(script);
        }
    }

    googleSpreadsheetsInformation(url, callback) {
        const script = document.createElement('script');
        script.id = 'spreadsheetsInformations';
        script.src = url.replace('{1}', script.id);

        if (document.getElementById(script.id) === null) {
            window[script.id] = ((jsonData) => {
                delete window[script.id];

                const convertEntryToItem = (entry) => {
                    const item = {};
                    const rx = /^gsx\$(.*)$/;
                    _.map(entry, (value, key) => {
                        if (rx.test(key)) {
                            item[rx.exec(key)[1]] = value.$t;
                        }
                    });

                    return new Information(item);
                };
                _.map(jsonData.feed.entry, (entry) => {
                    const item = convertEntryToItem(entry);
                    this.informations.push(item);
                });

                callback(this.informations);
            });

            document.head.appendChild(script);
        }
    }
}
