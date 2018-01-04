import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classname';
import ItemsStore from '../stores/ItemsStore';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { mobileHeaderOpen: false, informations: ItemsStore.informations() };

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

    openMobileMenu() {
        const self = this;
        if (!this.state.mobileHeaderOpen) {
            document.querySelector('body').addEventListener('click', function handler(e) {
                const targetClass = e.target.classList;
                const clickCondition = targetClass.contains('header') || targetClass.contains('pt-trigger') || targetClass.contains('profile-pic') || targetClass.contains('site-title') || targetClass.contains('fa-bars');
                if (!clickCondition) {
                    self.setState({ mobileHeaderOpen: false });
                    e.currentTarget.removeEventListener(e.type, handler);
                }
            });
        }

        this.setState({ mobileHeaderOpen: !this.state.mobileHeaderOpen });
    }

    render() {
        const informations = this.state.informations[0];
        const name = `${informations.name} ${informations.surname}`;
        const headerClass = classNames({
            header: true,
            'mobile-menu-hide': !this.state.mobileHeaderOpen,
            'mobile-menu-show': this.state.mobileHeaderOpen,
        });
        return (
            <div>
                <header id="site_header" className={headerClass}>
                    <div className="my-photo">
                        <img src={informations.image} alt={name} className="profile-pic" />
                        <div className="mask" />
                    </div>

                    <div className="site-title-block">
                        <h1 className="site-title">{name}</h1>
                        <p className="site-description">{informations.role}</p>
                    </div>

                    {/* Navigation & Social buttons */}
                    <div className="site-nav">
                        {/* Main menu */}
                        <ul id="nav" className="site-main-menu">
                            {/* About Me Subpage link */}
                            <li>
                                <Link className="pt-trigger" to="/" onClick={() => this.openMobileMenu()}>Home</Link>
                            </li>
                            <li>
                                <Link className="pt-trigger" to="/about" onClick={() => this.openMobileMenu()}>About me</Link>
                            </li>
                            <li>
                                <Link className="pt-trigger" to="/resume" onClick={() => this.openMobileMenu()}>Resume</Link>
                            </li>
                            <li>
                                <Link className="pt-trigger" to="/contact" onClick={() => this.openMobileMenu()}>Contact</Link>
                            </li>
                        </ul>
                        {/* /Main menu */}

                        {/* Social buttons */}
                        {/* Full list of social icons: http://fontawesome.io/icons/#brand */}
                        <ul className="social-links">
                            <li>
                                <a className="tip social-button" href={informations.facebook} title="Facebook">
                                    <i className="fa fa-facebook" />
                                </a>
                            </li>
                            <li>
                                <a className="tip social-button" href={informations.github} title="GitHub">
                                    <i className="fa fa-github" />
                                </a>
                            </li>
                            <li>
                                <a className="tip social-button" href={informations.linkedin} title="Linkedin">
                                    <i className="fa fa-linkedin" />
                                </a>
                            </li>
                        </ul>
                        {/* /Social buttons */}
                    </div>
                    {/* Navigation & Social buttons */}
                </header>
                {/* Mobile Header */}
                <div className="mobile-header mobile-visible">
                    <div className="mobile-logo-container">
                        <div className="mobile-site-title">{name}</div>
                    </div>
                    <a className="menu-toggle mobile-visible" onClick={() => this.openMobileMenu()}>
                        <i className="fa fa-bars" />
                    </a>
                </div>
                {/* /Mobile Header */}
            </div>
        );
    }
}
