import api from '../Core/api';
import React from 'react';
import NewsList from '../NewsList/NewsList';
import './categorypage.css';
import SearchBar from '../Core/SearchBar';
import Loader from '../Core/Loader/Loader';

class CategoryPage extends React.Component {

  state = {isLoading:false,initialArticles: [], articles: [], apiError: "", activecategory: ""};


  componentDidMount = async () => {

    try {
      let current = this.props.match.params.categoryname;
      await this.setCategory(current);
    }
    catch (error) {
      debugger;
      this.setState({ apiError: error });
    }
  }
  componentDidUpdate = async (prevprops, prevstate) => {//make function ,useEffect later
    try {
      let current = this.props.match.params.categoryname;
      let previous = prevprops.match.params.categoryname;

      if (current !== previous) {
        await this.setCategory(current);
      }
    }
    catch (error) {
      this.setState({ apiError: error });
    }
  }

  setCategory = async (category) => {
    this.setState({isLoading:true});
    const response = await api.getByCategory(category);
    this.setState({ articles: response, initialArticles: response ,isLoading:false});
  }

  searchWord = (word) => {

    let filtered =
      this.state.initialArticles
        .filter(article =>
          article.title.toLowerCase().includes(word.toLowerCase()));

    this.setState({ articles: filtered });
  }

  showNews = () =>
  {
    return this.state.articles.length === 0 ? (<Loader/>): (<NewsList articles={this.state.articles}/>);
  }

  showError = () =>
  {
    return !this.state.apiError ? "": this.state.apiError.message;
  }

  render() {
  
    return (
      <>
        <div className=".searchbar">
            <SearchBar searchWord={this.searchWord}></SearchBar>
            {this.showNews()}
            {<p>{this.showError()}</p>}
        </div>
      </>
    );
  }
}

export default CategoryPage;