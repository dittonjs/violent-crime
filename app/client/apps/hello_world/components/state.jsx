import React from 'react';

export default class State extends React.Component {
  render() {

    const selectedOutline = <rect
          x={this.props.x}
          y={this.props.y}
          height={this.props.scale}
          width={this.props.scale}
          stroke={'blue'}
          fill='none' strokeWidth="2" />
    return (
      <React.Fragment>
        <g onClick={(d) => {
              const state = this.props.data.Abbreviation
              this.props.changeState(state)
            }}
            
            style={{cursor:'pointer'}}>
          <rect
            style={{transition: 'fill .5s ease'}}
            x={this.props.x}
            y={this.props.y}
            height={this.props.scale}
            width={this.props.scale}
            fill={this.props.fill}
          />
          <text
            style={{ fill: 'white', font: '1.5rem sans-serif' }}
            x={this.props.x + (.1 * this.props.scale)}
            y={this.props.y + (.1 * this.props.scale)}
            alignmentBaseline="hanging"
          >
            {this.props.data.Abbreviation}
          </text>
          {this.props.selected ? selectedOutline : null}
        </g>
      </React.Fragment>
    )
  }
}
