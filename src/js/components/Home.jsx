import React, { Component } from 'react';
import moment from 'moment';
import ItemsStore from '../stores/ItemsStore';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { informations: ItemsStore.informations() };

        this.onLoadInformations = this.onLoadInformations.bind(this);
    }

    componentWillMount() {
        ItemsStore.addLoadInformationsListener(this.onLoadInformations);
    }

    componentWillUnmount() {
        ItemsStore.removeLoadInformationsListener(this.onLoadInformations);
    }

    onLoadInformations() {
        this.setState({ informations: ItemsStore.informations() });
    }

    render() {
        const informations = this.state.informations[0];
        const name = `${informations.name} ${informations.surname}`;
        const age = moment().diff(moment(informations.birthdate, 'DD/MM/YYYY'), 'years');
        const email = informations.email;
        const emailLink = `mailto:${email}`;

        return (
            <div className="subpages">
                <section className="pt-page pt-page-1 section-with-bg section-paddings-0 pt-page-current" style={{ backgroundImage: "url('/images/home_page_bg.jpg')" }}>
                    <div className="home-page-block-bg">
                        <div className="mask" />
                    </div>
                    <div className="home-page-block">
                        <div className="v-align">
                            <h2>{name}</h2>
                            <div style={{ display: 'block' }}>
                                <p className="home-page-description">{informations.role}</p>
                            </div>
                            <div className="block end" style={{ textAlign: 'center' }}>
                                <ul className="info-list">
                                    <li><span className="title">Age</span><span className="value">{age}</span></li>
                                    <li><span className="title">City</span><span className="value">{informations.city}</span></li>
                                    <li><span className="title">e-mail</span><span className="value"><a href={emailLink}>{email}</a></span></li>
                                    <li><span className="title">Phone</span><span className="value">{informations.phone}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
