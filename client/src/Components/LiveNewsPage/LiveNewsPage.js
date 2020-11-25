import React from 'react';
import './livenewspage.css';
import { Header,TextArea,Label,Icon,Button,Form,Message } from "semantic-ui-react";

class LiveNewsPage extends React.Component {

    
    state={title:"",description:"",author:"",urlToImage:"",error:false}

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.props.post[name] = value;

        this.setState({[name]: value});
    }

    newPost = (event) => {
        event.preventDefault();

        this.props.post.id = "";
        this.props.post.title = "";
        this.props.post.description = "";
        this.props.post.author = "";
        this.props.post.urlToImage = "";
        
        this.setState({title: "", description: "",author:"",urlToImage:""});
    }

    savePost = async (event) => {
      
        event.preventDefault();
 
        this.props.savePost(this.props.post);
        this.newPost(event);
        this.setState({error:false});
        this.props.closePopup();
    }

    render() {
        console.log(`lalala: ${this.props}`);
        console.log(`lalala1: ${this.props.post}`);
        return (
            <>
            <div>
            <br/>
            <Header as="h2">{this.props.post._id ? `Editting post with id=${this.props.post._id}` : "Adding a new post"}</Header>
            <Form error id="myForm" className="form">
                <Label htmlFor="title"> <Icon name='bullseye' />Title</Label>
                <br/>
                <TextArea 
                    id="title" 
                    name="title"
                    value={this.props.post.title} 
                    onChange={this.handleChange}  
                    rows="2" cols="50" 
                    placeholder="Insert Title here">
                </TextArea>
                <br/>
                <Label htmlFor="description"> <Icon name='clipboard' /> Description</Label>
                <br/>
                <TextArea 
                    id="description"  
                    name="description"  
                    value={this.props.post.description} 
                    onChange={this.handleChange} 
                    rows="3" cols="50" 
                    placeholder="Insert description here">
                </TextArea>
                <br/>
                <Label htmlFor="author"><Icon name='smile' />Author</Label>
                <br/>
                <TextArea 
                    id="author"  
                    name="author"  
                    value={this.props.post.author} 
                    onChange={this.handleChange} 
                    rows="1" cols="50" 
                    placeholder="Insert author here">
                </TextArea>
                <br/>
                <Label htmlFor="imageUrl"><Icon name='camera' />Image</Label>
                <br/>
                <TextArea 
                    id="urlToImage"  
                    name="urlToImage"  
                    value={this.props.post.image} 
                    onChange={this.handleChange} 
                    rows="1" cols="50" 
                    placeholder="Insert image url here">
                </TextArea>
                <br/>
                <div>You should consent to location sharing for showing location</div>
                <br/>
                <div>{this.state.error?
                <Message className="msg" error header='Empty Fields' content='All fields are required'></Message>:null}
                </div> 
                <Button primary onClick={this.savePost}>{this.props.post._id ? "Save" : "Add"}</Button>
                <Button primary onClick={this.props.closePopup}>Cancel</Button>
                <br/>
            </Form> 
            </div>
        </>
        );
    }
}
export default LiveNewsPage;