import React, { Component } from "react";
import { connect } from "react-redux";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";
import styled from "styled-components";

class Map extends Component {
  state = { center: { lat: 37.3595704, lng: 127.105399 } };
  constructor(props) {
    super(props);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
  }
  changeBounds(bounds) {
    this.setState({ bounds });
  }

  handleBoundsChanged(bounds) {
    this.changeBounds(bounds);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state || prevProps !== this.props) {
      window.navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          center: {
            lat: parseFloat(pos.coords.latitude),
            lng: parseFloat(pos.coords.longitude)
          }
        });
      });
    }
  }
  //37.548345399999995,126.9254803

  render() {
    console.log(this.state.center);
    if (this.state.bounds) console.log(this.state.bounds._ne);
    return (
      <StyledMap
        naverRef={ref => {
          this.mapRef = ref;
        }}
        mapDivId={"react-naver-map"}
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={10}
        bounds={this.state.bounds}
        onBoundsChanged={this.handleBoundsChanged}
        center={this.state.center}
      />
    );
  }
  componentDidMount() {
    // map이 생성될 때의 bounds를 알기 위해 method를 이용합니다.
    this.changeBounds(this.mapRef.getBounds());
  }
}

const mapStateToProps = state => state;

const StyledMap = styled(NaverMap)`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const MapContainer = () => {
  return (
    <RenderAfterNavermapsLoaded ncpClientId="rrwyegccx8">
      <Map />
    </RenderAfterNavermapsLoaded>
  );
};
export default connect(mapStateToProps)(MapContainer);
