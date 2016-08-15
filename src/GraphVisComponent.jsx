import React, {Component} from 'react';

class GraphVisComponent extends Component {

	iframe() {
    return {
      __html: this.props.iframe
        }
    }

    render() {
        return (
        <div>
          <div dangerouslySetInnerHTML={ this.iframe() } />
        </div>
        )
    }
}

export default GraphVisComponent;
