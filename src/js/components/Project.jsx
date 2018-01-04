import React, { Component } from 'react';

export default class Project extends Component {

    renderLink() {
        let html;

        if (this.props.item.url.length > 0) {
            html = (
                <h4 className="event-name">
                    <a href={this.props.item.url} style={{ color: '#222' }} target="_blank" rel="noopener noreferrer">{this.props.item.project}</a> @ {this.props.item.company}
                </h4>
            );
        } else {
            html = (
                <h4 className="event-name">
                    {this.props.item.project} @ { this.props.item.company}
                </h4>
            );
        }

        return html;
    }

    render() {
        return (
            <div className="timeline-event te-primary">
                <h5 className="event-date">{this.props.item.from} - {this.props.item.to}</h5>
                {this.renderLink()}
                <span className="event-description">{this.props.item.technology.join(', ')}</span>
                <p>{this.props.item.description}</p>
            </div>
        );
    }
}
