import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';

import { tweenDistribution } from './actions';

class NumbersChanger extends React.Component {
    constructor(props) {
        super(props);

        this.state = { data: props.targets };
    }

    changeNumber = (index, value) => {
        if (value.length === 0) value = 0;

        const props = this.props;

        const data = this.state.data;
        const targets = props.targets;

        props.tweenDistribution([
            ...targets.slice(0, index),
            parseFloat(value),
            ...targets.slice(index + 1)
        ]);

        this.setState({
            data: [
                ...data.slice(0, index),
                parseFloat(value),
                ...data.slice(index + 1)
            ]
        })
    }

    handleKeyDown = (index, evt) => {
        const key = evt.key;
        const value = parseFloat(evt.target.value);

        if (key === 'ArrowUp') this.changeNumber(index, value + 1);
        if (key === 'ArrowDown') this.changeNumber(index, value - 1);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ data: nextProps.targets });
    }

    render() {
        const numbersChangerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center'
        };

        const changers = this.state.data.map((number, index) => {
            return (
                <Input
                    value={number}
                    onChange={(evt) => {
                        this.changeNumber(index, evt.target.value)
                    }}
                    onKeyDown={(evt) => this.handleKeyDown(index, evt)}
                    key={`nc-${index}`}
                    style={{ marginBottom: '3px', width: '100%' }}
                />
            );
        });

        return (
            <div style={numbersChangerStyle}>
                {changers}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.data,
        targets: state.targets
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        tweenDistribution: (targets) => {
            dispatch(tweenDistribution(targets));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumbersChanger);