import React from "react";
import MapContainer from "./MapContainer";
import ListContainer from "./ListContainer";

const Landing = () => {
  return (
    <div>
      <MapContainer />
      <ListContainer style={styles.listStyle} />
    </div>
  );
};

const styles = {
  listStyle: {
    marginTop: "3vh"
  }
};

export default Landing;
