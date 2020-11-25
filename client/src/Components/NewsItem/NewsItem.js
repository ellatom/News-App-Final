import { List,Header,Grid,Image } from "semantic-ui-react";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

//show the post details of each post in news list.
const NewsItem = (props) => {

  useEffect(()=>{
    Aos.init({duration:2000});
  },[]);

  const { article } = props;
  return (
    <List.Item className="listItem" data-aos="zoom-in">
      <Grid>
        <Grid.Column width={10}>
          <Header as="h3">{article.title}</Header>
          <List.Description className="listDescription">
            {article.description}
          </List.Description>
          <List bulleted horizontal>
            <List.Item>
              <a href={article.url}>
                {article.source.name}</a>
            </List.Item>
            <List.Item>{article.publishedAt.split("T")[0]}</List.Item>
            <List.Item>{article.author!== null?article.author:'no author'}</List.Item>
          </List>
          <br/>
          <List horizontal>
              <List.Item  className="no" verticalalign='middle'><i className="fas fa-times"><span className="tooltiptext">False News</span></i></List.Item>
              <List.Item  className="mayby" verticalalign='middle'><i className="fas fa-question"><span className="tooltiptext">Not Fully True News</span></i></List.Item>
              <List.Item  className="yes" verticalalign='middle'><i className="far fa-heart"><span className="tooltiptext">True News</span></i></List.Item>
          </List>
        </Grid.Column>
        
        <Grid.Column width={3}>
          <Image src={article.urlToImage!==null?article.urlToImage:"https://i.guim.co.uk/img/media/c4be9e861737d25f001c0232b15e5564f9832c71/0_101_3500_2100/master/3500.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=5449c0bdc7be7db8db0b76268ed1f73f"} />
        </Grid.Column>
        
      </Grid>
    </List.Item>
  );
  };//there are some strange author like https...only handles null author and removed time in published at.//bug phone remove tooltip
  
export default NewsItem;