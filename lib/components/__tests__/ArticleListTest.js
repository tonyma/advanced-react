import React from 'react';
import ArticleList from '../ArticleList';
import {shallow} from 'enzyme';

describe('ArticleList', () => {
  const testProp={
    articles:{
      a:{id:'a'},
      b:{id:'b'}
    }
  };
  it('renders correctly',()=>{
    const wrapper=shallow(
      <ArticleList
        {...testProp}
      />
    );

    expect(wrapper.find('ArticleContainer').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  })
});
