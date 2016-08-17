import React, {Component} from 'react';
import {Panel } from 'react-bootstrap';
import {Polar} from 'react-chartjs-2';



class PolarChartComponent extends Component{
  constructor(props){
    super(props)

  }

  render() {
    return (
        <Panel>
          <Polar data={this.props.data} />
        </Panel>
      )
  }
}

export default PolarChartComponent;
