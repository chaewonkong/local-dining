import React, { Component } from "react";
import { connect } from "react-redux";

class MapContainer extends Component {
  render() {
    return <div>This is map container</div>;
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MapContainer);
