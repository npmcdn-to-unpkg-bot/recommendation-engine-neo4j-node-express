import React, {Component} from 'react';
import { Jumbotron  } from 'react-bootstrap';

class Hero extends Component {
  render() {
    return (
      <Jumbotron className ="over container body-content" id="jumbotron">
        <h1>For Devs By Devs</h1>
        <p>A simple page to help you learn what skills you should learn next. By selecting skills you will be able to see...</p>
      </Jumbotron>
    );
  }
}

export default Hero;
