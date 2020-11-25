import React from "react";
import { Link } from 'react-router-dom';

//creates the navigation by clicking on header category  menu
class LinkList extends React.Component {

     state = { activeId: this.props.active ||  "general" };

     onClick = (event) => {
    
          this.setState({activeId: event.target.id });

     }
//semantic gui needs in class name active-to know the active category to color and violet define the color
     getClassName = (category) =>
     {

          let className = 'item left menu';

          className += 
               this.state.activeId === category ? ' active violet' : '';

          return className;
     }

     renderList = () => {
          return this.props.categories.map((category, index) => {
               let categoryLowercase = category.toLowerCase();
               return (
                    <Link
                         key={index}
                         id={`${categoryLowercase}`}
                         to={category==='Sign In' ? `/user/login`:(category==='Sign Up' ? `/user/register`:`/category/${categoryLowercase}`)}
                         className={this.getClassName(categoryLowercase)}
                         onClick={this.onClick} >
                         {category==='Sign In' || category==='Sign Up'? <div className="ui primary button">{category}</div>:category}
                    </Link>
               );
          });
     }

     render() {
          return (<>{this.renderList()}</>)
     }
};

export default LinkList;

//instead of this
//{ <div className="left menu">
//   <Link id="sports" to="/category/sports" className='item' onClick={this.toggleToActive}>
//     Sports
//   </Link>
// </div>

