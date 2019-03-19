import React, { Component } from "react";
import { connect } from "react-redux";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";
import axios from "axios";
import styled from "styled-components";
import { updateList } from "../actions";

class Map extends Component {
  state = { center: { lat: 37.3595704, lng: 127.105399 }, places: [] };
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

  componentDidMount() {
    // map이 생성될 때의 bounds를 알기 위해 method를 이용합니다.
    this.changeBounds(this.mapRef.getBounds());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      window.navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          center: {
            lat: parseFloat(pos.coords.latitude),
            lng: parseFloat(pos.coords.longitude)
          }
        });
      });
      const { _ne, _sw } = this.state.bounds;
      axios
        .get(`/api/places?nex=${_ne.x}&ney=${_ne.y}&swx=${_sw.x}&swy=${_sw.y}`)
        .then(res => {
          const places = Array.from(res.data);
          //   console.log(updateList(p));
          this.props.dispatch(updateList(places));
        });
    }
  }
  //37.548345399999995,126.9254803

  render() {
    // if (this.state.bounds) console.log(this.state.bounds);
    // if (this.state) console.log(this.state);
    // console.log(this.props);
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
}

const mapStateToProps = state => state;

// const mapDispatchToProps = dispatch => {
//   return {
//     dispatch
//   };
// };

const StyledMap = styled(NaverMap)`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

export default connect(
  mapStateToProps
  //   mapDispatchToProps
)(Map);
