import React from 'react';
import { max, scaleLinear, scaleQuantile, scaleSequential, axisRight, select } from 'd3';

const KEYS = [
  "AggravatedAssault",
  "Burglary",
  "MurderAndNonnegligentManslaughter",
  "RevisedRape",
]

const LABELS = [
  "Assault",
  "Burglary",
  "Murder",
  "Rape"
]

const COLORS = [
  '#0091EA',
  '#00B8D4',
  '#D50000',
  '#5C6BC0',
]

export default class StackedBarChart extends React.Component {
  constructor() {
    super();
    this.state= {
      hoveredData: null
    }
  }


  getInfo() {
    const width = 775;
    const height = 370;
    const xScale = scaleLinear()
      .domain([0, 50])
      .range([0, width - 60]);
    const maxCrimes = max(this.props.data.slice(0,51), d => _.sum(_.map(KEYS, key => d[key+"Rate"])));
    const stateWidth = ((width - 40) / 51) - 2
    const heightPerIncident = (height - 100) / 3300;
    return {heightPerIncident, stateWidth, maxCrimes, xScale, height, width}
  }

  getHighlightedData() {
    const { width } = this.getInfo();
    if (!this.state.hoveredData) return null;
    const texts = _.map(KEYS, (key, i) => {
      return (
        <React.Fragment>
          <text x={(((width - 150) / KEYS.length) * i) + 150} y={15}>{LABELS[i]}: {this.state.hoveredData[key] || this.state.hoveredData["LegacyRape"]}</text>
          <text x={(((width - 150) / KEYS.length) * i) + 150} y={30}>{LABELS[i]}: {this.state.hoveredData[key+"Rate"] || this.state.hoveredData["LegacyRapeRate"]}</text>
        </React.Fragment>
      )
    });
    return (
      <g>
        <text x={20} y={15}>Instances =></text>
        <text x={20} y={30}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rates =></text>
        {texts}
      </g>
    )
  }

  renderAxis() {
    const { height } = this.getInfo();
    const axisFunc = axisRight(scaleLinear().domain([3300, 0]).range([50, height - 20]));
    select('#sbc-axis').call(axisFunc);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  getKey() {
    const { width } = this.getInfo()
    const colorSquares = _.map(
      _.reverse([...COLORS]),
      (color, i) => <rect key={color} x={width - 15} y={10 + (i * 10)} width={8} height={8} fill={color} />
    );

    const labels = _.map(
      _.reverse([...LABELS]),
      (label, i) => <text key={label} x={width - 20} y={10 + (i * 10)} style={{textAnchor: 'end', fontSize: "10px", alignmentBaseline: "hanging"}}>{label}</text>
    )


    return (
      <g>
        {colorSquares}
        {labels}
      </g>
    )
  }

  setHoveredData = data => this.setState({ hoveredData: data })

  render() {
    if (!this.props.selectedYear) return <div className="paper"><h2>Select A Year to see stats for that year</h2></div>;

    const {heightPerIncident, stateWidth, maxCrimes, xScale, height, width} = this.getInfo();
    const rects = _.map(this.props.data.slice(0,51), (d,i) => {
      let totalHeight = 0;
      return _.map(KEYS, (key, j) => {
        const rectHeight = heightPerIncident * (d[key+"Rate"] || d["LegacyRapeRate"]);
        const rect = (
          <rect
            style={{ transition: "all .3s ease" }}
            key={d.StateID + key}
            width={stateWidth}
            height={rectHeight}
            fill={COLORS[j]}
            stroke={this.state.hoveredData === d ? 'black' : 'none'}
            x={40 + xScale(i)}
            y={height - totalHeight - rectHeight - 20}
            onMouseEnter={() => this.setHoveredData(d)}
            onMouseLeave={() => this.setHoveredData(null)}
          />
        );
        totalHeight += rectHeight;
        return rect;
      })
    })

    const labels = _.map(this.props.data.slice(0,51), (d, i) => (
      <text key={`${d.StateID}_label`} x={40 + xScale(i)} y={height - 10} style={{fontSize: '8px'}}>{d.StateID}</text>
    ))


    return (
      <div className="paper">
        <svg width={width} height={height}>
          {_.flatten(rects)}
          { labels }
          <g id="sbc-axis" />
          {this.getKey()}
          {this.getHighlightedData()}
        </svg>
      </div>
    )
  }
}
