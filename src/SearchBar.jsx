import React, {Component} from 'react';
import {FormGroup,FormControl } from 'react-bootstrap';

class SearchBar extends Component {
  constructor(props){
        super(props)
        this.state = {}
  }

  handleChange = (e) => {
    // debugger;
    this.props.handleTextInput(e.target.value)
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
        >
          <FormControl
            type="text"
            value={this.props.searchBarValue}
            placeholder="Enter the Skills you have"
            onChange={(e) => this.handleChange(e)}
          />
        </FormGroup>
      </form>
    );
  }
}

export default SearchBar;
