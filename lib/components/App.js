import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import pickby from 'lodash.pickby';

import DataApi from 'state-api';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';

class App extends React.Component {
  state = this.props.store.getState();
  static childContextTypes={
    store:PropTypes.object
  }
  getChildContext(){
    return {store:this.props.store};
  }

  onStorechange=()=>{
    this.setState(this.props.store.getState());
  };


  componentDidMount() {
    this.subscriptionId=this.props.store.subscribe(this.onStorechange);
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render() {
    let articles=this.state.articles;

    if(this.state.searchTerm){
      articles=pickby(articles,(value,key)=>{
        return value.title.match(this.state.searchTerm)
        || value.body.match(this.state.searchTerm);
      });
    }

    return (
      <div>
        <SearchBar
          searchTerm={this.state.searchTerm}
          handleSearch={this.props.store.handleSearch}
        />
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }
}

export default App;
