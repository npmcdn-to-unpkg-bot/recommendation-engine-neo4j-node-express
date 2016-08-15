import React, {Component} from 'react';
import TokenAutocomplete from 'react-bootstrap-typeahead';

class TokenAutocompleteInput extends Component{
  constructor(props){
    super(props)
    this.state = {
      myData:[
       { name: 'Objective-C'},
       { name: 'Perl'},
       { name: 'PHP'},
       { name: 'Python'}
      ]
    }
  }

  handleInputChange = (e) => {

      this.props.handleTokenSelection(e)
  }
  handleChange = (e) => {

      this.props.handleTokenSelection(e)
  }

  render(){
     return (
       <TokenAutocomplete
        multiple
        labelKey="name"
        onInputChange={(e) => this.handleChange(e)}
        onChange={(e) => this.handleChange(e)}
        options={this.state.myData}
       />
     );
  }
}


export default TokenAutocompleteInput;
