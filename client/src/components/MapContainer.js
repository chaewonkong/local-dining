import React, { Component } from "react";
import { connect } from "react-redux";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";

class MapContainer extends Component {
  render() {
    return (
      <RenderAfterNavermapsLoaded ncpClientId="rrwyegccx8">
        <NaverMap
          mapDivId={"react-naver-map"}
          style={{
            width: "100%",
            height: "300px",
            margin: 0,
            padding: 0
          }}
          defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
          defaultZoom={10}
        />
      </RenderAfterNavermapsLoaded>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MapContainer);
// rrwyegccx8
