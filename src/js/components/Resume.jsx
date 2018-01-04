import React, { Component } from 'react';
import _ from 'underscore';
import moment from 'moment';
import Project from './Project';
import ItemsStore from '../stores/ItemsStore';

export default class Resume extends Component {

    constructor(props) {
        super(props);
        this.state = { items: ItemsStore.items(), informations: ItemsStore.informations() };

        this.onLoadItems = this.onLoadItems.bind(this);
        this.onLoadInformations = this.onLoadInformations.bind(this);
    }

    componentDidMount() {
        ItemsStore.addLoadItemsListener(this.onLoadItems);
        ItemsStore.addLoadInformationsListener(this.onLoadInformations);
    }

    componentWillUnmount() {
        ItemsStore.removeLoadItemsListener(this.onLoadItems);
        ItemsStore.removeLoadInformationsListener(this.onLoadInformations);
    }

    onLoadInformations() {
        this.setState({ informations: ItemsStore.informations() });
    }

    onLoadItems() {
        this.setState({ items: ItemsStore.items() });
    }

    renderProjects() {
        return _.map(this.state.items, (item, index) => {
            return <Project key={index} item={item} />;
        });
    }

    render() {
        const year = moment().diff(moment('2013', 'YYYY'), 'years');
        return (
            <div className="subpages">
                <section className="pt-page pt-page-3 pt-page-current" data-id="resume">
                    <div className="section-title-block">
                        <h2 className="section-title">Resume</h2>
                        <h5 className="section-description">{year} Years of Experience</h5>
                    </div>

                    <div className="row">
                        {/* Start Resume section */}
                        <div className="col-sm-12 col-md-12 subpage-block">
                            <div className="block-title">
                                <h3>Experience</h3>
                            </div>
                            <div className="timeline">
                                {this.renderProjects()}
                            </div>
                        </div>
                        {/* End Resume section */}
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <div className="download-cv-block">
                                <a className="button" target="_blank" href={this.state.informations[0].curriculum} rel="noopener noreferrer">Download CV</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
