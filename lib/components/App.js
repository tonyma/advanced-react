import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import pickby from 'lodash.pickby';

import DataApi from 'state-api';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import TimeStamp from './TimeStamp';

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
    this.props.store.startClock();
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render() {
    let {articles,searchTerm}=this.state;

    const searchRE=new RegExp(searchTerm, 'i');
    if(this.state.searchTerm){
      articles=pickby(articles,(value)=>{
        return value.title.match(searchRE)
        || value.body.match(searchRE);
      });
    }

    return (
      <div>
        <TimeStamp />
        <SearchBar />
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }
}

export default App;
