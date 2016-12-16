import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { colorScale } from '../util';

class PieChart extends React.Component {
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
        const radius = Math.min(this.props.width, this.props.height) / 2;

        const arc = d3.arc()
            .innerRadius(radius / 2)
            .outerRadius(radius)
            .cornerRadius(3)
            .padAngle(0.0174533);

        const pie = d3.pie()
            .value((d) => { return d; })
            .sort(null);

        const labelArc = d3.arc()
            .outerRadius(radius - 32)
            .innerRadius(radius - 32);

        const myData = pie(this.props.data);

        const groups = myData.map((dataPoint, index) => {
            const myColor = colorScale(dataPoint.data, [ 70, 130, 180 ], this.props.data, this.state.focused, index);

        const opacity = this.state.focused !== null && this.state.focused !== index ? 0.4 : 1

        const textColor = this.state.focused === index ? 'white' : 'black'

            return (
                <g
                    key={`arc-${index}`}
                    transform={`translate(${this.props.width / 2}, ${this.props.height / 2})`}
                    opacity={opacity}
                >
                    <path
                        d={arc(dataPoint)}
                        fill={myColor}
                        onMouseOver={ (evt) => {
                            this.setFocus(index);
                        }}
                        onMouseOut={this.resetFocus}
                    />
                    <text
                        transform={`translate(${labelArc.centroid(dataPoint)})`}
                        fill={textColor}
                    >
                        {dataPoint.data}
                    </text>
                </g>
            );
        });

        return (
            <div style={{ paddingBottom: '16px' }}>
                <svg
                    id={this.props.id}
                    className="arc"
                    width={this.props.width}
                    height={this.props.height}
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

export default connect(mapStateToProps)(PieChart);
