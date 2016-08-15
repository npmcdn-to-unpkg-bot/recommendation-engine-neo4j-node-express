import React, {Component} from 'react';
import {Panel } from 'react-bootstrap';
import {Polar} from 'react-chartjs-2';



class PolarChartComponent extends Component{
  constructor(props){
    super(props)
    this.state ={
      data: this.props.data
    }
  }

  render() {
    return (
        <Panel bsStyle="primary">
          <Polar data={this.state.data} />
        </Panel>
      )
  }
}

export default PolarChartComponent;
