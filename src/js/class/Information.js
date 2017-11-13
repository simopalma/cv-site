import _ from 'underscore';

export default class Item {
    constructor({ name = '', surname = '', birthdate = '', image = '', phone = '', email = '', github = '', biography = '' }) {
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
        this.image = image;
        this.phone = phone;
        this.email = email;
        this.github = github;
        this.biography = biography;
    }
}
