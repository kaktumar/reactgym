'use strict';

var React = require('react/addons'),
    ValidatedInput = require('./ValidatedInput'),
    ExerciseStoreActionCreators = require('../../actions/ExerciseStoreActionCreators'),
    AppStateActionCreators = require('../../actions/AppStateActionCreators'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

var AddExercise = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {};
    },

    handleSubmit() {
        if(this.props.edit) {
            ExerciseStoreActionCreators.updateExercise({
                id: this.props.exercise.id,
                label: this.refs.name.getDOMNode().value
            });
        } else {
            ExerciseStoreActionCreators.addExercise(this.refs.name.getDOMNode().value);
        }
        AppStateActionCreators.closeModal();
    },

    handleCancel() {
        AppStateActionCreators.closeModal();
    },

    render() {
        var self = this,
            value = this.props.edit ? this.props.exercise.label : '';

       return (
            <div className='form exercises'>
                <h1>Add Exercise</h1>
                <ValidatedInput validator='string' ref='name' value={value} placeholder='name' className='nameField' />
                <button className='submitButton' onClick={this.handleSubmit}>Submit</button> |
                <button className='cancelButton' onClick={this.handleCancel}>Cancel</button>
            </div>
        );
    },
});

module.exports = AddExercise;

