import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';

import { setData } from './actions';

class NumbersChanger extends React.Component {
    constructor(props) {
        super(props);
    }

    changeNumber = (index, value) => {
        if (value.length === 0) {
            value = 0;
        }

        this.props.setData([
            ...this.props.data.slice(0, index),
            parseFloat(value),
            ...this.props.data.slice(index + 1)
        ]);
    }

    render() {
        const justNumbers = this.props.data.map((dataPoint) => {
            return dataPoint.value
        });
        
        const numbersChangerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center'
        }

        const changers = this.props.data.map((number, index) => {
            return (
                <Input
                    value={number}
                    onChange={(evt) => {
                        this.changeNumber(index, evt.target.value)
                    }}
                    key={`nc-${index}`}
                    style={{ marginBottom: '3px', width: '100%' }}
                />
            )
        });

        return (
            <div style={numbersChangerStyle}>
                {changers}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.data[`${ownProps.dataSet}data`]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setData: (data) => {
            dispatch(setData({ dataSet: ownProps.dataSet, data: data }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NumbersChanger)
