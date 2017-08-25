import React from 'react';

import Article from './Article';

class ArticleList extends React.Component {
  render() {
    const {articles,articleActions}=this.props;
    return (
      <div>
        {Object.values(articles).map(article=>
            <Article
              key={article.id}
              article={article}
            />)
          }
        </div>
    );
  }
}

export default ArticleList;
