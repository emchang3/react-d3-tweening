import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { colorScale } from '../util';
import { tweenRadii } from '../actions';

class PieChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = { focused: null };
    }

    setFocus = (index) => {
        const radialStati = [ 1, 1, 1, 1, 1 ];
        radialStati[index] = 1.1;

        this.props.tweenRadii(radialStati);

        this.setState({ focused: index });
    }

    resetFocus = () => {
        const radialStati = [ 1, 1, 1, 1, 1 ];

        this.props.tweenRadii(radialStati);

        this.setState({ focused: null });
    }

    render() {
        const radius = Math.min(this.props.width, this.props.height) / 4;

        const pie = d3.pie()
            .value((d) => { return d; })
            .sort(null);

        const labelArc = d3.arc()
            .outerRadius(radius - 32)
            .innerRadius(radius - 32);

        const myData = pie(this.props.data);

        const groups = myData.map((dataPoint, index) => {
            const myColor = colorScale(
                dataPoint.data,
                [ 70, 130, 180 ],
                this.props.data,
                this.state.focused,
                index
            );

            const opacity = (
                this.state.focused !== null &&
                this.state.focused !== index
            ) ? 0.7 : 1

            const textColor = this.state.focused === index ? 'white' : 'black'

            let innerRadius = radius / 2;

            const outerRadius = radius * this.props.radialStati[index];

            const arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .cornerRadius(3)
                .padAngle(0.0174533);

            return (
                <g
                    key={`arc-${index}`}
                    transform={`translate(${this.props.width / 2}, ${this.props.height / 2})`}
                    opacity={opacity}
                    onMouseOver={(evt) => {
                        this.setFocus(index);
                    }}
                    onMouseOut={this.resetFocus}
                >
                    <path
                        d={arc(dataPoint)}
                        fill={myColor}
                    />
                    <text
                        transform={`translate(${labelArc.centroid(dataPoint)})`}
                        fill={textColor}
                    >
                        {this.props.targets[index]}
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
        data: state.data,
        targets: state.targets,
        radialStati: state.radialStati
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        tweenRadii: (radii) => dispatch(tweenRadii(radii))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);
