import React, { Component } from 'react';
import ItemsStore from '../stores/ItemsStore';

export default class About extends Component {

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
        const role = informations.role;

        return (
            <div className="subpages">
                <section className="pt-page pt-page-2 pt-page-current" data-id="about_me">
                    <div className="section-title-block">
                        <h2 className="section-title">About Me</h2>
                        <h5 className="section-description">{role}</h5>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-12 subpage-block">
                            <div className="general-info">
                                <h3>I am {role} @ {informations.company}</h3>
                                <p>{informations.biography}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
