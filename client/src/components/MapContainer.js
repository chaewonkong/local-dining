import React, { Component } from "react";
import { connect } from "react-redux";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";

class MapContainer extends Component {
  render() {
    return (
      <div>
        <RenderAfterNavermapsLoaded ncpClientId="rrwyegccx8">
          <NaverMap id="naver_maps" style={{ width: "100%" }} height="300px" />
        </RenderAfterNavermapsLoaded>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MapContainer);
