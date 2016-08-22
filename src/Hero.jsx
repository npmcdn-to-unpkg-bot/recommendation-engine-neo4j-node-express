import React, {Component} from 'react';
import { Jumbotron  } from 'react-bootstrap';

class Hero extends Component {
  render() {
    return (
      <Jumbotron className ="over container body-content" id="jumbotron">
        <h1>for Devs By Devs</h1>
        <p>A simple dashboard to help you learn what the global developer population can tell you about the skills you know or want to learn...</p>
      </Jumbotron>
    );
  }
}

export default Hero;
