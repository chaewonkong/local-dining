import React from "react";
import { InputBase } from "@material-ui/core";
import { SearchBox, SearchButton } from "./common";

const Search = props => (
  <SearchBox elevation={props.elevation}>
    <InputBase placeholder={props.placeholder} onChange={props.onChange} />
    <SearchButton type="search" onClick={item => props.onClick(item)} />
  </SearchBox>
);

export default Search;
