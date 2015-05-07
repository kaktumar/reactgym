'use strict';

let React = require('react'),
    TrainingStore = require('../stores/TrainingStore.js'),
    _ = require('lodash'),
    SimpleHeaderMixin = require('../mixins/SimpleHeaderMixin'),
    PureRenderMixin = require('react').addons.PureRenderMixin;

let TrainingDetail = React.createClass({
    header: {
        title: 'Detail'
    },

    mixins: [PureRenderMixin, SimpleHeaderMixin],

    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {};
    },

    render() {
        let training = TrainingStore.getTrainingForId(this.context.router.getCurrentQuery().training);
        if (training) {
            let exercises = training.getIn(['workout', 'exercises']);
            training = training.toJS();
            let sets = _.map(training.sets, (set, exercise) => {
                let sets = set.map((item, idx) => {
                    return (<div className='set' key={idx}><span className='count'>#{idx + 1}</span>
                    <span className='repsweight'>Reps: {item.reps} / Weight: {item.weight}</span></div>);
                });
                return (
                    <div className='exercise' key={exercise}>
                        <div><strong>{exercises.find(e => e.get('id') == exercise).get('label')}</strong></div>
                        <div>{sets}</div>
                    </div>);
            });
            return (
                <div className='page trainingdetail'>
                    <h2>{training.workout.label}</h2>
                    <div className='date'><i className='ion-calendar'>
                    </i> {new Date(training.dateStart).toLocaleString()}</div>
                    <div className='duration'><i className='ion-android-time'>
                    </i> {this.formatMinutes(training.dateStart, training.dateEnd)} minutes</div>
                    {sets}
                </div>
            );
        } else {
            return (
                <div className='page trainingdetail'>
                    invalid Id
                </div>
            );
        }
    },

    formatMinutes(from, to) {
        return Math.floor((new Date(to) - new Date(from)) / 1000 / 60);
    }
});

module.exports = TrainingDetail;
