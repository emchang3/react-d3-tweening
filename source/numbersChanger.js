import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';

import { tweenDistribution } from './actions';

class NumbersChanger extends React.Component {
    constructor(props) {
        super(props);

        this.state = { data: props.data };
    }

    changeNumber = (index, value) => {
        if (value.length === 0) value = 0;

        this.props.tweenDistribution(index, parseFloat(value));

        this.setState({
            data: [
                ...this.state.data.slice(0, index),
                parseFloat(value),
                ...this.state.data.slice(index + 1)
            ]
        })
    }

    handleKeyDown = (index, evt) => {
        const key = evt.key;
        const value = parseFloat(evt.target.value);

        if (key === 'ArrowUp') this.changeNumber(index, value + 1);
        if (key === 'ArrowDown') this.changeNumber(index, value - 1);
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
        data: state.data
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        tweenDistribution: (index, value) => {
            dispatch(tweenDistribution({
                index: index,
                value: value
            }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NumbersChanger);