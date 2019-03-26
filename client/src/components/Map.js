/*global daum*/

import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { updateList } from "../actions";
import Search from "./Search";

class Map extends Component {
  state = { currentPos: {}, bounds: {}, level: 3 };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        currentPos: {
          lat: parseFloat(pos.coords.latitude),
          lng: parseFloat(pos.coords.longitude)
        }
      });
    });

    let el = document.getElementById("map");

    let map = new daum.maps.Map(el, {
      center: new daum.maps.LatLng(33.450701, 126.570667),
      level: 3
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      let el = document.getElementById("map");
      const { lat, lng } = this.state.currentPos;
      let map = new daum.maps.Map(el, {
        center: new daum.maps.LatLng(lat, lng),
        level: 3
      });

      this.renderControl(map);

      daum.maps.event.addListener(map, "center_changed", () => {
        this.getPlacesFromBounds(map);
      });
      this.getPlacesFromBounds(map);
    }
  }

  getPlacesFromBounds(map) {
    let bounds = map.getBounds();
    let swLatLng = bounds.getSouthWest();
    let neLatLng = bounds.getNorthEast();
    const { swLat, swLng, neLat, neLng } = {
      swLat: parseFloat(swLatLng.getLat()),
      swLng: parseFloat(swLatLng.getLng()),
      neLat: parseFloat(neLatLng.getLng()),
      neLng: parseFloat(neLatLng.getLng())
    };

    axios
      .get(
        `/api/places?swLat=${swLat}&swLng=${swLng}&neLat=${neLat}&neLng=${neLng}`
      )
      .then(res => {
        const places = Array.from(res.data);
        this.props.dispatch(updateList(places));
      })
      .then(() => this.renderMarker(map));
  }

  renderControl(map) {
    const zoomControl = new daum.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.TOPRIGHT);
  }

  renderMarker(map) {
    const places = this.props.places;

    return places.map(place => {
      const [lng, lat] = place.geometry.coordinates;
      let markerPosition = new daum.maps.LatLng(
        parseFloat(lat),
        parseFloat(lng)
      );
      let marker = new daum.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);
    });
  }

  render() {
    // console.log(this.state);
    return (
      <Container>
        <KakaoMap id="map" />
        <Control>
          <Search placeholder="장소 검색" elevation={3} />
        </Control>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 70vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const KakaoMap = styled.div`
  width: 70vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Control = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  overflow: hidden;
  z-index: 1;
  background: white;
  padding: 1px;
`;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Map);
