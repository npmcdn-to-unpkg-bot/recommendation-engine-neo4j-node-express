import React, {Component} from 'react';
import {Panel } from 'react-bootstrap';
import {Radar} from 'react-chartjs-2';



class RadarChartComponent extends Component{
  constructor(props){
    super(props)

  }

  render() {
    return (
        <Panel bsStyle="primary">
          <Radar data={this.props.data} />
        </Panel>
      )
  }
}

export default RadarChartComponent;
