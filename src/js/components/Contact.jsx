import React, { Component } from 'react';
import ItemsStore from '../stores/ItemsStore';

export default class Contact extends Component {

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
        const email = informations.email;
        const emailLink = `mailto:${email}`;

        return (
            <div className="subpages">
                <section className="pt-page pt-page-6 pt-page-current" data-id="contact">
                    <div className="section-title-block">
                        <h2 className="section-title">Contact</h2>
                        <h5 className="section-description">Get in Touch</h5>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 col-md-6 subpage-block">
                            <div className="block-title">
                                <h3>Get in Touch</h3>
                            </div>
                            <p>You can contact me at the following links:</p>
                            <div className="contact-info-block">
                                <div className="ci-icon">
                                    <i className="pe-7s-icon pe-7s-map-marker" />
                                </div>
                                <div className="ci-text">
                                    <h5>{informations.city}</h5>
                                </div>
                            </div>
                            <div className="contact-info-block">
                                <div className="ci-icon">
                                    <i className="pe-7s-icon pe-7s-mail" />
                                </div>
                                <div className="ci-text">
                                    <h5><a href={emailLink} style={{ color: '#222' }}>{email}</a></h5>
                                </div>
                            </div>
                            <div className="contact-info-block">
                                <div className="ci-icon">
                                    <i className="pe-7s-icon pe-7s-call" />
                                </div>
                                <div className="ci-text">
                                    <h5>{informations.phone}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
