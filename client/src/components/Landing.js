import React from "react";
import styled from "styled-components";
import MapContainer from "./MapContainer";
import List from "./List";

const Landing = () => {
  return (
    <div>
      <MapContainer />
      <ListContainer>
        <List>ListContainer</List>
      </ListContainer>
    </div>
  );
};

const ListContainer = styled.div`
  margin-top: 3vh;
`;

export default Landing;
