import React from "react";
import { List} from "semantic-ui-react";
import './newsList.css'
import NewsItem from "../NewsItem/NewsItem";

//News List-posts devided with Line,each post is news item, each category has news list. 
const NewsList = (props) => {
  return (
    <List divided>
      {props.articles.map((article,index) => (
        <NewsItem key={index} article={article} ></NewsItem>
      ))}
    </List>
  );
};

export default NewsList;