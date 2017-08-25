import React from 'react';
import debounce from 'lodash.debounce';

import storeProvider from './storeProvider';

class SearchBar extends React.Component {
  state={searchTerm:''};
  doSearch=debounce(()=>{this.props.handleSearch(this.state.searchTerm)},300)
  handleSearch=(e)=>{
    this.setState({searchTerm:e.target.value}, ()=>{
      this.doSearch();
    })
  };
  render() {
    return (
      <input
        type="search"
        placeholder="Type to search ..."
        onChange={this.handleSearch}
        value={this.props.searchTerm}
      />
    );
  }
}

function extraProps(store){
  return {searchTerm:store.searchTerm};
}
export default storeProvider(extraProps)(SearchBar);
