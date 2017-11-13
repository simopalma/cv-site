import _ from 'underscore';

export default class Item {
    constructor({ project = '', from = '', to = '', role = '', url = '', description = '', technologies = '' }) {
        this.project = project;
        this.from = from;
        this.to = to;
        this.role = role;
        this.technology = technologies.trim() !== '' ? _.map(technologies.split(','), (technology) => {
            return technology.trim();
        }) : [];
        this.url = url;
        this.description = description;
    }
}
