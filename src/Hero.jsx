import React, {Component} from 'react';
import { Jumbotron  } from 'react-bootstrap';

class Hero extends Component {
  render() {
    return (
      <Jumbotron>
        <h1>For Devs By Devs</h1>
        <p>This is a simple page to help you learn what skills you should learn next.</p>
      </Jumbotron>
    );
  }
}

export default Hero;
