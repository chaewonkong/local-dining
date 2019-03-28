import React, { Component, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import { Column, Header } from "./common";
import Search from "./Search";
import ListView from "./ListView";
import AddDetail from "./AddDetail";
import { SEARCH, ADD_DETAIL, PLACE_LIST } from "../actions/types";

class AddPlace extends Component {
  state = { searchText: "", searchResults: [], type: SEARCH };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.newPlace !== this.props.newPlace)
      this.setState({
        type: this.props.newPlace.type
      });
  }

  handleClick = () => {
    const text = this.state.searchText;
    axios.get(`/api/search?query=${text}`).then(res => {
      const searchResults = res.data.map(item => {
        const { name, address, id, category, lat, lng, phone } = item;
        return { name, address, id, category, lat, lng, phone };
      });
      this.setState({ searchResults, type: PLACE_LIST });
    });
  };

  handleTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  renderView() {
    const { type } = this.state;
    console.log(this.props);
    switch (type) {
      case SEARCH:
        return (
          <SearchBox>
            <Search
              elevation={1}
              placeholder="상호명을 검색해 주세요"
              onChange={this.handleTextChange}
              onClick={() => this.handleClick()}
            />
          </SearchBox>
        );
      case ADD_DETAIL:
        return <AddDetail />;
      case PLACE_LIST:
        return (
          <Fragment>
            <SearchBox>
              <Search
                elevation={1}
                placeholder="상호명을 검색해 주세요"
                onChange={this.handleTextChange}
                onClick={() => this.handleClick()}
              />
            </SearchBox>
            <ListBox>
              {this.state.searchResults.length ? (
                <ListView data={this.state.searchResults} />
              ) : null}
            </ListBox>
          </Fragment>
        );
      default:
        return <p>Loading...</p>;
    }
  }

  render() {
    return (
      <Container>
        <Header title="착한밥집 추가하기" />

        {this.renderView()}
        {/* <SearchBox>
          <Search
            elevation={1}
            placeholder="상호명을 검색해 주세요"
            onChange={this.handleTextChange}
            onClick={() => this.handleClick()}
          />
        </SearchBox>
        <ListBox>
          {this.state.searchResults.length ? (
            <ListView data={this.state.searchResults} />
          ) : null}
        </ListBox> */}
      </Container>
    );
  }
}

const Container = styled(Column)`
  width: 100%;
`;

const SearchBox = styled.div`
  margin: 3vh 0;
  display: flex;
  justify-content: center;
`;

const ListBox = styled.div`
  width: 90%;
`;

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AddPlace);
