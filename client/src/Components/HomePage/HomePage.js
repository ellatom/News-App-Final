import api from './api';
import React from 'react';
import { Container } from "semantic-ui-react";
import NewsList from '../NewsList/NewsList';
import './homepage.css';
import SearchBar from './SearchBar';

//menu homepage=general category
class HomePage extends React.Component {

  state = { articles: [], initialArticles: [],apiError: "" };

  componentDidMount = async () => {

    try {
      const response = 
        await api.getByCategory("general");

      this.setState({ articles: response, initialArticles:response });
    }
    catch (error) {
      this.setState({ apiError: error });
    }
  }

  searchWord = (word) => {
  
    let filtered =
      this.state.initialArticles
        .filter(article =>
          article.title.toLowerCase().startsWith(word.toLowerCase()));

    this.setState({ articles: filtered });
  }

  // change receive error from api
  render() {
    console.log(`Homepage.render`);
    const { articles, apiError } = this.state;//distruct this.state.articles
    return (
      <Container text>
        <div className="ui pointing menu">
          <div className="right menu">
            <div className="item">
              <div className="ui transparent icon input">
                <SearchBar searchWord={this.searchWord}></SearchBar>
                <i className="search link icon"></i>
              </div>
            </div>
          </div>
        </div>

        {articles && <NewsList articles={articles} />}
        {apiError && <p>{this.state.apiError}</p>}
      </Container>

    );
  }
}

export default HomePage;