import React, {Component} from 'react';
import {Panel } from 'react-bootstrap';
import {Radar} from 'react-chartjs-2';



class RadarChartComponent extends Component{
  constructor(props){
    super(props)
    this.state ={
      data: this.props.data
    }
  }

  render() {
    return (
        <Panel bsStyle="primary">
          <Radar data={this.state.data} />
        </Panel>
      )
  }
}

export default RadarChartComponent;
