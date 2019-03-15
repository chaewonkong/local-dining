import React from "react";
import styled from "styled-components";
import MapContainer from "./MapContainer";
import List from "./List";

const Landing = () => {
  return (
    <Container>
      <MapContainer />
      <ListContainer>
        <List>ListContainer</List>
      </ListContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const ListContainer = styled.div``;

export default Landing;
