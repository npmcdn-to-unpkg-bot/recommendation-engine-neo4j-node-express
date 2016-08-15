import React,{Component} from 'react';
import {Panel } from 'react-bootstrap';
const Plotly = require('react-plotlyjs');


class PlotlyChartComponent extends Component{
  constructor(props){
    super(props)

  }

  render() {
    const title = (
      <h3>Panel title</h3>
    );
    return (
      <Panel header={title} bsStyle="primary">
        <Plotly className="whatever" data={this.props.data} layout={this.props.layout} config={this.props.config}/>
      </Panel>
    );
  }
}

export default PlotlyChartComponent;
