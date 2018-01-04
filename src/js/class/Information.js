export default class Item {
    constructor({ name = '', surname = '', birthdate = '', city = '', image = '', phone = '', email = '', github = '', biography = '', role = '', facebook = '', linkedin = '', company = '', curriculum = '' }) {
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
        this.city = city;
        this.image = image;
        this.phone = phone;
        this.email = email;
        this.github = github;
        this.biography = biography;
        this.role = role;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.company = company;
        this.curriculum = curriculum;
    }
}
