import React, { Component } from "react";
import { connect } from "react-redux";
import { Marker, NaverMap } from "react-naver-maps";
import axios from "axios";
import styled from "styled-components";
import { updateList } from "../actions";
// import { mapxyToLatLong } from "../geoTrans";

class Map extends Component {
  state = {
    center: { lat: 37.3595704, lng: 127.105399 },
    places: [],
    zoom: 12
  };
  constructor(props) {
    super(props);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    const navermaps = window.naver.maps;
    this.state = {
      zoomControlOptions: {
        position: navermaps.Position.TOP_RIGHT
      },
      searchBox: {
        position: navermaps.Position.TOP_LEFT
      }
    };
  }
  changeBounds(bounds) {
    this.setState({ bounds });
  }

  handleBoundsChanged(bounds) {
    this.changeBounds(bounds);
  }

  renderMarker() {
    if (this.mapRef) {
      this.props.places.map(place => {
        const [lng, lat] = place.geometry.coordinates;
        return (
          <Marker
            position={() => {
              const navermaps = this.mapRef.props.navermaps;
              return new navermaps.LatLng(parseFloat(lat), parseFloat(lng));
            }}
            zIndex={100}
            visible
          />
        );
      });
    }
  }

  componentDidMount() {
    // map이 생성될 때의 bounds를 알기 위해 method를 이용합니다.
    this.changeBounds(this.mapRef.getBounds());
    this.setState({ navermaps: window.naver.maps });
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

  handleZoomIn() {
    this.setState({ zoom: this.state.zoom++ });
  }

  handleZoomOut() {
    this.setState({ zoom: this.state.zoom-- });
  }

  //37.548345399999995,126.9254803
  render() {
    // if (this.state.bounds) console.log(this.state.bounds);
    // if (this.state) console.log(this.state);
    return (
      <StyledMap
        naverRef={ref => {
          this.mapRef = ref;
        }}
        mapDivId={"react-naver-map"}
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={12}
        bounds={this.state.bounds}
        onBoundsChanged={this.handleBoundsChanged}
        center={this.state.center}
        zoomControl
        zoomControlOptions={this.state.zoomControlOptions}
        zoom={this.state.zoom}
      >
        {this.mapRef
          ? this.props.places.map(place => {
              const [lng, lat] = place.geometry.coordinates;
              return (
                <Marker
                  key={place._id}
                  position={() => {
                    const navermaps = this.mapRef.props.navermaps;
                    return new navermaps.LatLng(
                      parseFloat(lat),
                      parseFloat(lng)
                    );
                  }}
                  zIndex={100}
                  visible
                />
              );
            })
          : null}

        {this.mapRef ? (
          <Overlay
            position={() => this.mapRef.props.navermaps.Position.TOP_LEFT}
            zIndex={100}
            visible
          />
        ) : null}
        {/* <Overlay position={() => this.state.searchBox} zIndex={100} visible>
          This is overLay
        </Overlay> */}
        {/* {this.mapRef ? (
          <Marker
            position={() => {
              const navermaps = this.mapRef.props.navermaps;
              return new navermaps.LatLng(37.5480851767326, 126.925285776613);
            }}
            zIndex={100}
            visible
          />
        ) : null} */}
      </StyledMap>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

const StyledMap = styled(NaverMap)`
  width: 70vw;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const Overlay = styled.div`
  width: 100px;
  height: 100px;
  z-index: 100;
  background: white;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
