import React from 'react';
import _ from 'lodash';
import {zip} from 'd3';

export default class GradientLegend extends React.Component {
  render() {
    const ticks = this.props.scale.ticks().map((t,i,n) => ({
      offset: `${100*i/n.length}%`, 
      color: this.props.scale(t) 
    }));
    
    const gradients = _.map(ticks, (d,i) => (
      <stop key={i} offset={d.offset} stopColor={d.color} stopOpacity={1}/>
    ));

    const gradientStyle = {
      fill: 'url(#gradient)'
    };

    const textStyle = {
      textAnchor: "end"
    };

    const barHeight = this.props.height*0.25;
    const textHeight = (this.props.height-barHeight) / 2;

    return (
      <React.Fragment>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%' spreadMethod='pad'>
            { gradients }
          </linearGradient>
        </defs>
        <rect x={0} y={textHeight} width={this.props.width} height={barHeight} style={gradientStyle}/>
        <text x={0} y={textHeight}>{this.props.min}</text>
        <text x={this.props.width} y={textHeight} style={textStyle}>{this.props.max}</text>
      </React.Fragment>
    )
  }
}
