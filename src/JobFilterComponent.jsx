import React, {Component} from 'react';
import {Panel, ButtonGroup,Button } from 'react-bootstrap';
var BarChart = require('react-chartjs-2').Bar;

class JobFilterComponent extends Component{
  constructor(props){
    super(props)
  }

  handleClick = (e) => {
      this.props.handleButtonClick(e)
  }

  render() {

    return (
      <ButtonGroup >
        <Button
            className="button_Jobs"
            value="Jobs"
            className={(this.props.activeButton === "Jobs") ? "active" : ""}
            onClick={(e,d) => { this.handleClick(e.target.value)}}
            >Job Name</Button>
        <Button
            className="button_Average_Age"
            value="Average_Age"
            className={(this.props.activeButton === "Average_Age") ? "active" : ""}
            onClick={(e,d) => { this.handleClick(e.target.value)}}
            >Average Age</Button>
        <Button
            className="button_Average_Exp"
            value="Average_Exp"
            className={(this.props.activeButton === "Average_Exp") ? "active" : ""}
            onClick={(e,d) => { this.handleClick(e.target.value)}}
            >Average Exp</Button>
        <Button
            className="button_Average_Ability"
            value="Average_Ability"
            className={(this.props.activeButton === "Average_Ability") ? "active" : ""}
            onClick={(e,d) => { this.handleClick(e.target.value)}}
            >Average Ability</Button>
        <Button
            className="button_Women_On_Team"
            value="Women_On_Team"
            className={(this.props.activeButton === "Women_On_Team") ? "active" : ""}
            onClick={(e,d) => { this.handleClick(e.target.value)}}
            >Women On Team</Button>
      </ButtonGroup>
      )
  }
}

export default JobFilterComponent;
