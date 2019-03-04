import React, { Component } from "react";
import { connect } from "react-redux";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
  }
  changeBounds(bounds) {
    this.setState({ bounds });
  }

  handleBoundsChanged(bounds) {
    this.changeBounds(bounds);
  }

  render() {
    if (this.state.bounds) console.log(this.state.bounds._ne);
    return (
      <NaverMap
        naverRef={ref => {
          this.mapRef = ref;
        }}
        mapDivId={"react-naver-map"}
        style={{
          width: "100%",
          height: "300px",
          margin: 0,
          padding: 0
        }}
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={10}
        bounds={this.state.bounds}
        onBoundsChanged={this.handleBoundsChanged}
      />
    );
  }
  componentDidMount() {
    // map이 생성될 때의 bounds를 알기 위해 method를 이용합니다.
    this.changeBounds(this.mapRef.getBounds());
  }
}

const mapStateToProps = state => state;

const MapContainer = () => {
  return (
    <RenderAfterNavermapsLoaded ncpClientId="rrwyegccx8">
      <Map />
    </RenderAfterNavermapsLoaded>
  );
};
export default connect(mapStateToProps)(MapContainer);
