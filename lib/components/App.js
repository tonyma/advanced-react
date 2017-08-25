import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import DataApi from 'state-api';
import ArticleList from './ArticleList';

class App extends React.Component {
  state = this.props.store.getState();
  static childContextTypes={
    store:PropTypes.object
  }
  getChildContext(){
    return {store:this.props.store};
  }
  render() {
    return (
      <ArticleList
        articles={this.state.articles}
        store={this.props.store}
      />
    );
  }
}

export default App;
