'use strict';

let React = require('react/addons'),
    Router = require('react-router'),
    HeaderState = require('../stores/HeaderState'),
    AppStateActionCreators = require('../actions/AppStateActionCreators'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

let Header = React.createClass({
    mixins: [Router.State, Router.Navigation, PureRenderMixin],

    getInitialState() {
        return {
            config: HeaderState.getConfig()
        };
    },

    back() {
        this.goBack();
    },

    render() {
        let currentRoute = this.getRoutes().reverse()[0].name,
            add,
            config = this.state.config,
            editMode,
            title,
            showBack = (!config.back || currentRoute === 'home') ? 'hide' : '';
        if(config.title && config.title.visible) {
            title = <span className="headertitle">{config.title.text}</span>; 
        }

        if(config.add && config.add.visible) {
            add = <span className="headeradd ion-android-add" onClick={config.add.handler}></span>;
        }

        if(config.editMode && config.editMode.visible) {
            editMode = <div className="headeredit ion-edit" onClick={config.editMode.handler}></div>;
        }
        return (
            <div className='header'>
                <span className="headermenu ion-drag" onClick={AppStateActionCreators.toggleMenu}></span>
                <span className={"back " + showBack} onClick={this.back}><i className='ion-arrow-left-b'></i></span>
                {title}
                {add}
                {editMode}
            </div>
        );
    },

    componentDidMount() {
        HeaderState.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        HeaderState.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({config: HeaderState.getConfig()});
    }
});

module.exports = Header;

