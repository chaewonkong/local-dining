import React from "react";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import Map from "./Map";

const RenderedMap = () => {
  return (
    <RenderAfterNavermapsLoaded ncpClientId="rrwyegccx8">
      <Map />
    </RenderAfterNavermapsLoaded>
  );
};

export default RenderedMap;
