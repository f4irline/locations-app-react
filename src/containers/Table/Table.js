import React, { Component } from 'react';
import Controls from '../../components/Controls/Controls';
import Row from '../../components/Row/Row';

import ('./Table.css');

class Table extends Component {

  state = {
    locations: [],
  }

  componentDidMount() {
    this.setState({locations: this.props.locations});
  }

  componentDidUpdate() {
    if (this.state.locations !== this.props.locations) {
      this.setState({locations: this.props.locations});
    }
  }

  render() {
    const locations = this.state.locations;

    const rows = locations.map((location) => {
      return <Row key={location.id} row={location} />
    })

    return (
        <div className='Table'>
            {rows}
            <Controls addLocation={this.props.addLocation} />
        </div>
    )
  }
}

export default Table;