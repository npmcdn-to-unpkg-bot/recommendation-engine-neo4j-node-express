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

  handleChange = (e) => {
    if(e[0] !== undefined)
      this.props.handleTokenSelection(e[0].name)
  }

  render(){
     return (
       <TokenAutocomplete
        multiple
        labelKey="name"
        onChange={(e) => this.handleChange(e)}
        options={this.state.myData}
       />
     );
  }
}


export default TokenAutocompleteInput;
