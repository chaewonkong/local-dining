import React from "react";
import { InputBase } from "@material-ui/core";
import { SearchBox, SearchButton } from "./common";

const Search = props => (
  <SearchBox elevation={props.elevation}>
    <InputBase
      placeholder={props.placeholder}
      onChange={props.onChange}
      onKeyPress={e => {
        if (e.key === "Enter") {
          return props.onClick();
        }
      }}
    />
    <SearchButton type="search" onClick={() => props.onClick()} />
  </SearchBox>
);

export default Search;
