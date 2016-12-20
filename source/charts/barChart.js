import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { colorScale } from '../util';

class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: null
        }
    }

    setFocus = (index) => {
        this.setState({
            focused: index
        });
    }

    resetFocus = () => {
        this.setState({
            focused: null
        });
    }

    render() {
        const x = d3.scaleLinear()
            .domain([0, d3.max(this.props.data)])
            .range([0, this.props.width]);

        const groups = this.props.data.map((dataPoint, index) => {
            const translateDist = index * this.props.barHeight;

            const myColor = colorScale(dataPoint, [ 70, 130, 180 ], this.props.data, this.state.focused, index);

            const opacity = this.state.focused !== null && this.state.focused !== index ? 0.4 : 1

            const textColor = this.state.focused === index ? 'white' : 'black'

            return (
                <g
                    transform={`translate(0, ${translateDist})`}
                    key={`rect-${index}`}
                    opacity={opacity}
                    onMouseOver={(evt) => {
                        this.setFocus(index);
                    }}
                    onMouseOut={this.resetFocus}
                >
                    <rect
                        width={x(dataPoint)}
                        height={this.props.barHeight - 3}
                        rx={3}
                        ry={3}
                        fill={myColor}
                    />
                    <text
                        x={x(dataPoint) - 12}
                        y={this.props.barHeight / 2}
                        dy={'.35em'}
                        fill={textColor}
                    >
                        {dataPoint}
                    </text>
                </g>
            );
        });

        return (
            <div style={{ paddingBottom: '16px' }}>
                <svg
                    id={this.props.id}
                    className="chart bar"
                    width={this.props.width}
                    height={this.props.barHeight * this.props.data.length}
                >
                    {groups}
                </svg>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.data[`${ownProps.dataSet}data`]
    }
}

export default connect(mapStateToProps)(BarChart);
